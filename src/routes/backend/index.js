const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");

router.use((req, res, next) => {
  req.app.set("layout", "backend/layouts/index");
  next();
});

router.use("/", require("./dashboardRoutes"));

router.use(
  "/users",
  authController.restrictTo("admin"),
  require("./userRoutes")
);

router.use("/orders", require("./orderRoutes"));

router.use("/discounts", require("./discountCodeRoutes"));

router.use("/products/sizes", require("./productSizeRoutes"));
router.use("/products/colors", require("./productColorRoutes"));
router.use("/products/categories", require("./productCategoryRoutes"));
router.use("/products", require("./productRoutes"));

router.use("/articles/categories", require("./articleCategoryRoutes"));
router.use("/articles", require("./articleRoutes"));

module.exports = router;
