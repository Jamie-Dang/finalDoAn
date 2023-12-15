const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/productController");
const mainValidator = require("../../validators/productValidator");
const { upload } = require("../../utils/upload");
const { NAME_COLLECTION } = require("../../configs/productConfig");

router.get("(/status/:status)?", mainController.getAll);
router.get("/form(/:id)?", mainController.getForm);
router.post(
  "/save",
  upload(NAME_COLLECTION).single("image"),
  mainValidator,
  mainController.saveData
);
router.get("/delete/:id", mainController.deleteData);
router.get("/change-status-ajax/:id/:status", mainController.changeStatusAjax);
router.get(
  "/change-ordering-ajax/:id/:ordering",
  mainController.changeOrderingAjax
);

module.exports = router;
