const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/orderController");

router.get("(/status/:status)?", mainController.getAll);
router.get("/form(/:id)?", mainController.getForm);
router.post("/save", mainController.saveData);

module.exports = router;
