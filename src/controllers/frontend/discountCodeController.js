const catchAsync = require("../../utils/catchAsync");
const discountCodeService = require("../../services/discountCodeService");

exports.validateDiscountCodeAjax = catchAsync(async (req, res, next) => {
  const { code } = req.body;

  const discountCode = await discountCodeService.getOne({ code });

  if (!discountCode) {
    res.send({ status: "error", message: "Mã giảm giá không hợp lệ" });
    return;
  }

  if (discountCode.startedAt > Date.now()) {
    res.send({ status: "error", message: "Mã giảm giá chưa được kích hoạt" });
    return;
  }

  if (discountCode.expiredAt < Date.now()) {
    res.send({ status: "error", message: "Mã giảm giá đã hết hạn" });
    return;
  }

  if (discountCode.quantity <= discountCode.used) {
    res.send({ status: "error", message: "Mã giảm giá đã hết lượt sử dụng" });
    return;
  }

  res.send({ status: "success", discountCode, message: "Mã giảm giá hợp lệ" });
});
