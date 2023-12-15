const express = require("express");

const authController = require("../../controllers/authController");

const router = express.Router();

router.get("/", authController.redirectIfLoggedIn, authController.signIn);
router.post("/", authController.processSignIn);

module.exports = router;
