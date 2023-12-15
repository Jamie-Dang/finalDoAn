const catchAsync = require("../../utils/catchAsync");
const productService = require("../../services/productService");

exports.getCart = catchAsync(async (req, res, next) => {
  res.render("frontend/pages/cart/index", {
    title: "Giỏ hàng",
  });
});

exports.populateCartAjax = catchAsync(async (req, res, next) => {
  const { cartJson } = req.body;
  const cart = JSON.parse(cartJson);

  const productIds = cart.map((item) => item.product);

  const products = await productService.getAllWithPopulates({
    _id: { $in: productIds },
  });

  const populatedCart = cart.map((item) => {
    const product = products.find((product) => product._id == item.product);
    return { ...item, product };
  });

  res.send({ status: "success", cart: populatedCart });
});
