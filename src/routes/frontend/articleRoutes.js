const express = require("express");
const articleController = require("../../controllers/frontend/articleController");

const router = express.Router();

router.get("/", articleController.getAllArticles);
router.get("/:slug", articleController.getArticle);

module.exports = router;
