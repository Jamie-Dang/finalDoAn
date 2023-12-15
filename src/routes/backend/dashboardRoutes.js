const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/dashboardController");

router.get("/", mainController.getDashboard);

module.exports = router;
