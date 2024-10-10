const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});
// admin
router.use(
  "/admin",
  authController.protect,
  authController.restrictTo("admin", "staff"),
  require("./backend")
);

// user
router.use("/", require("./frontend"));

module.exports = router;
