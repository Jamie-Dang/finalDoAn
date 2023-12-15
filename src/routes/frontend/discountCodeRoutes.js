const express = require("express");
const discountCodeController = require("../../controllers/frontend/discountCodeController");

const router = express.Router();

router.post("/", discountCodeController.validateDiscountCodeAjax);

module.exports = router;
