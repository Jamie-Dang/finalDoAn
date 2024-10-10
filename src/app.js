require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");

const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const moment = require("moment");
const compression = require("compression");
const AppError = require("./utils/appError");

const app = express();

app.locals.moment = moment;
app.locals.shortDateFormat = "DD/MM/YYYY";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);

// Connect to DB
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connection successfully!"))
  .catch((err) => console.log(err));

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "..", "access.log"),
//   { flags: "a" }
// );

// app.use(logger("combined", { stream: accessLogStream }));
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(compression());

app.use("/", require("./routes"));

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });
app.all("*", (req, res, next) => {
  next(new AppError(404, "Không tìm thấy trang"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (req.path.startsWith("/admin")) {
    res.status(err.status || 500);
    res.render("backend/pages/error", { layout: "backend/layouts/index" });
  } else {
    // render the error page
    res.status(err.status || 500);
    res.render("frontend/pages/error/index", {
      layout: false,
    });
  }
});

module.exports = app;
