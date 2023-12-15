const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/discountCodeController");
const mainValidator = require("../../validators/discountCodeValidator");

router.get("(/status/:status)?", mainController.getAll);
router.get("/form(/:id)?", mainController.getForm);
router.post("/save", mainValidator, mainController.saveData);
router.get("/delete/:id", mainController.deleteData);
module.exports = router;
