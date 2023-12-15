const catchAsync = require("../../utils/catchAsync");
const articleService = require("../../services/articleService");

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const articles = await articleService.getAll(
    { status: "active" },
    {
      sort: "-ordering -createdAt",
      populate: { path: "category", model: "ArticleCategory" },
    }
  );

  res.render("frontend/pages/articles/index", {
    title: "Danh sách bài viết",
    articles,
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.query;

  const articleQuery = id ? { _id: id } : { slug };
  const article = await articleService.getOne(articleQuery);

  res.render("frontend/pages/article/index", {
    title: "Bài viết",
    article,
  });
});
