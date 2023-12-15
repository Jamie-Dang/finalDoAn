const express = require("express");

const authController = require("../../controllers/authController");

const router = express.Router();

router.get("/", authController.redirectIfLoggedIn, authController.signUp);
router.post("/", authController.processSignUp);

module.exports = router;
