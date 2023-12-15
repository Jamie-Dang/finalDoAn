const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("../utils/appError");

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.redirect("/dang-nhap");
  }

  // 2) Verification token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.cookie("jwt", "");
    return res.redirect("/dang-nhap");
  }

  // 3) Check if user still exists
  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    return res.redirect("/dang-nhap");
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.redirectIfLoggedIn = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next();
  }

  // 2) Verification token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.cookie("jwt", "");
    return res.redirect("/dang-nhap");
  }

  // 3) Check if user still exists
  const currentUser = await userModel.findById(decoded.id);
  if (currentUser) {
    return res.redirect("/tai-khoan");
  }

  next();
});

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    res.locals.user = null;
    return next();
  }

  // 2) Verification token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.cookie("jwt", "");
    return res.redirect("/dang-nhap");
  }

  // 3) Check if user still exists
  const currentUser = await userModel.findById(decoded.id);
  if (!currentUser) {
    res.locals.user = null;
    return next();
  }

  // 4) Set user property on request object
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.signUp = catchAsync(async (req, res, next) => {
  res.render("frontend/pages/register/index", {
    title: "Đăng ký",
  });
});

exports.processSignUp = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.send({
      status: "error",
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  const existedUser = await userModel.findOne({ email });
  if (existedUser) {
    return res.send({ status: "error", message: "Tài khoản này đã tồn tại" });
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });

  res.send({ status: "success", message: "Đăng ký thành công" });
});

exports.signIn = catchAsync(async (req, res, next) => {
  res.render("frontend/pages/login/index", {
    title: "Đăng nhập",
  });
});

exports.processSignIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.send({
      status: "error",
      message: "Vui lòng nhập đầy đủ thông tin",
    });
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.send({
      status: "error",
      message: "Tài khoản hoặc mật khẩu không đúng",
    });
  }

  const isMatched = bcrypt.compareSync(password, user.password);
  if (!isMatched) {
    return res.send({
      status: "error",
      message: "Tài khoản hoặc mật khẩu không đúng",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });

  res.send({ status: "success", message: "Đăng nhập thành công" });
});

exports.logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.redirect("/dang-nhap");
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "Bạn không có quyền truy cập"));
    }

    next();
  };
};
