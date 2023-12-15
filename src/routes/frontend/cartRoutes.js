const express = require("express");

const authController = require("../../controllers/authController");
const cartController = require("../../controllers/frontend/cartController");

const router = express.Router();

router.get("/", authController.getCurrentUser, cartController.getCart);
router.post("/", cartController.populateCartAjax);

module.exports = router;
