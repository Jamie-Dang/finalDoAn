const catchAsync = require("../../utils/catchAsync");
const productService = require("../../services/productService");
const orderService = require("../../services/orderService");
const discountCodeService = require("../../services/discountCodeService");

exports.createOrderAjax = catchAsync(async (req, res, next) => {
  const {
    name,
    phone,
    address,
    cartJson,
    discountCode,
    discount,
    shippingFee,
  } = req.body;

  if (!name || !phone || !address || !cartJson || !shippingFee) {
    res.send({ status: "error", message: "Vui lòng nhập đầy đủ thông tin" });
    return;
  }

  const cart = JSON.parse(cartJson);
  if (!cart.length) {
    res.send({ status: "error", message: "Giỏ hàng trống" });
    return;
  }

  const productIds = cart.map((item) => item.product);
  const products = await productService.getAllWithPopulates({
    _id: { $in: productIds },
  });
  const populatedCart = cart.map((item) => {
    const product = products.find((product) => product._id == item.product);
    const size = product.sizes.find((size) => size._id == item.size);
    return { ...item, product, size };
  });

  const temporaryTotal = populatedCart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.product.price * currentValue.quantity,
    0
  );

  let total = 0;

  if (temporaryTotal + parseInt(shippingFee) - parseInt(discount) < 0) {
    total = 0;
  } else {
    total = temporaryTotal + parseInt(shippingFee) - parseInt(discount);
  }

  const items = populatedCart.map((item) => {
    return {
      product: item.product._id,
      size: item.size.name,
      quantity: item.quantity,
      price: item.product.price,
    };
  });

  await orderService.create({
    user: req.user._id,
    name,
    phone,
    address,
    items,
    discountCode,
    discount,
    shippingFee,
    total,
  });

  await discountCodeService.updateOne(
    { code: discountCode },
    { $inc: { used: 1 } },
    { new: true }
  );

  res.send({ status: "success", message: "Đặt hàng thành công" });
});
