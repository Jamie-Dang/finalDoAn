const catchAsync = require("../../utils/catchAsync");
const articleService = require("../../services/articleService");
const productService = require("../../services/productService");

exports.getHomePage = catchAsync(async (req, res, next) => {
  const newProducts = await productService.getAll(
    { status: "active" },
    { sort: "createdAt", limit: 4 }
  );

  res.render("frontend/pages/home/index", {
    title: "Trang chủ",
    newProducts,
  });
});
