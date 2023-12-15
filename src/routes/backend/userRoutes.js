const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/userController");
const mainValidator = require("../../validators/userValidator");

router.get("(/role/:role)?", mainController.getAll);
router.get("/form(/:id)?", mainController.getForm);
router.post("/save", mainValidator, mainController.saveData);
router.get("/delete/:id", mainController.deleteData);

module.exports = router;
