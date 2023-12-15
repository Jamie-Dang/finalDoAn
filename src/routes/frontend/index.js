const express = require("express");
const router = express.Router();

const authController = require("../../controllers/authController");
const homeController = require("../../controllers/frontend/homeController");

router.use(async (req, res, next) => {
  req.app.set("layout", false);

  next();
});

router.get("/", homeController.getHomePage);

router.get("/dang-xuat", authController.logout);

router.use("/san-pham", require("./productRoutes"));
router.use("/bai-viet", require("./articleRoutes"));
router.use("/gio-hang", require("./cartRoutes"));
router.use("/ma-giam-gia", require("./discountCodeRoutes"));
router.use("/dang-nhap", require("./loginRoutes"));
router.use("/dang-ky", require("./registerRoutes"));

router.use("/tai-khoan", authController.protect, require("./accountRoutes"));
router.use("/don-hang", authController.protect, require("./orderRoutes"));

module.exports = router;
