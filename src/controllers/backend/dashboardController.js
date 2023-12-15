const articleService = require("../../services/articleService");
const productService = require("../../services/productService");
const userService = require("../../services/userService");
const orderService = require("../../services/orderService");

exports.getDashboard = async (req, res, next) => {
  const totalProducts = await productService.count({});
  const totalArticles = await articleService.count({});
  const totalUsers = await userService.count({});
  const totalOrders = await orderService.count({});

  res.render("backend/pages/dashboard/index", {
    title: "Bảng điều khiển",
    totalArticles,
    totalUsers,
    totalProducts,
    totalOrders,
  });
};
