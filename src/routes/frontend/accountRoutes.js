const express = require("express");
const accountController = require("../../controllers/frontend/accountController");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/tai-khoan/thong-tin-ca-nhan");
});
router.get("/thong-tin-ca-nhan", accountController.getAccountInfo);

router.post("/thong-tin-ca-nhan", accountController.processAccountInfo);

router.get("/don-hang", accountController.getOrderHistory);
router.get("/don-hang/:id", accountController.getOrder);

router.post("/don-hang/huy", accountController.cancelOrderAjax);

module.exports = router;
