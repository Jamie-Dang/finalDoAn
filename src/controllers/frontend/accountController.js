const catchAsync = require("../../utils/catchAsync");

const userService = require("../../services/userService");
const orderService = require("../../services/orderService");

exports.getAccountInfo = catchAsync(async (req, res, next) => {
  res.render("frontend/pages/account/info", {
    title: "Thông tin tài khoản",
  });
});

exports.processAccountInfo = catchAsync(async (req, res, next) => {
  const { name, phone, address } = req.body;

  await userService.updateOne({ _id: req.user._id }, { name, phone, address });

  res.send({ status: "success", message: "Cập nhật thông tin thành công!" });
});

exports.getOrderHistory = catchAsync(async (req, res, next) => {
  const orders = await orderService.getAll(
    {
      user: req.user._id,
    },
    {
      sort: "-createdAt",
      populate: {
        path: "items.product",
        model: "Product",
      },
    }
  );

  res.render("frontend/pages/account/orders", {
    title: "Danh sách đơn hàng",
    orders,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await orderService.getOne({
    _id: req.params.id,
    user: req.user._id,
  });

  // console.log(order);

  res.render("frontend/pages/account/order", {
    title: "Chi tiết đơn hàng",
    order,
  });
});

exports.cancelOrderAjax = catchAsync(async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    res.send({
      status: "error",
      message: "Không nhận được thông tin đơn hàng",
    });
    return;
  }

  const order = await orderService.getOne({ _id: id });
  if (!order) {
    res.send({ status: "error", message: "Đơn hàng không tồn tại" });
    return;
  }

  if (order.status !== "pending") {
    res.send({ status: "error", message: "Đơn hàng đã được xử lý" });
    return;
  }

  await orderService.updateOne(
    { _id: id },
    { status: "cancelled" },
    { new: true }
  );

  res.send({ status: "success", message: "Hủy đơn hàng thành công" });
});
