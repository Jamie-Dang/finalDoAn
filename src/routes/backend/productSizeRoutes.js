const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/productSizeController");
const mainValidator = require("../../validators/sizeValidator");

router.get("(/status/:status)?", mainController.getAll);
router.get("/form(/:id)?", mainController.getForm);
router.post("/save", mainValidator, mainController.saveData);
router.get("/delete/:id", mainController.deleteData);
router.get("/change-status-ajax/:id/:status", mainController.changeStatusAjax);
router.get(
  "/change-ordering-ajax/:id/:ordering",
  mainController.changeOrderingAjax
);

module.exports = router;
