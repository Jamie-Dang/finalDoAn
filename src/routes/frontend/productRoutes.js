const express = require("express");
const productController = require("../../controllers/frontend/productController");

const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:slug", productController.getProduct);

router.post("/ajax", productController.filterAndSearchAjax);

module.exports = router;
