const express = require("express");
const orderController = require("../../controllers/frontend/orderController");

const router = express.Router();

router.post("/", orderController.createOrderAjax);

module.exports = router;
