const express = require("express");
const router = express.Router();

const mainController = require("../../controllers/backend/articleCategoryController");
const mainValidator = require("../../validators/categoryValidator");

router.get("(/status/:status)?", mainController.getAll);
router.get("/form(/:id)?", mainController.getForm);
router.post("/save", mainValidator, mainController.saveData);
router.get("/delete/:id", mainController.deleteData);
router.get("/change-status-ajax/:id/:status", mainController.changeStatusAjax);
router.get(
  "/change-ordering-ajax/:id/:ordering",
  mainController.changeOrderingAjax
);

// router.post("/", async (req, res, next) => {
//   const item = await mainService.create(req.body);

//   res.status(201).json({
//     status: "success",
//     data: { item },
//   });
// });

// router.get("/", async (req, res, next) => {
//   const items = await mainService.getAll();

//   res.json(items);
// });

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  const item = await mainService.getOne({ _id: id });
  const category = await categoryService.getOne({ _id: item.categoryId });

  res.send(category.name);
});
module.exports = router;
