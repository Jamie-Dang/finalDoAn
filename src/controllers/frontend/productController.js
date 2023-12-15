const catchAsync = require("../../utils/catchAsync");
const productService = require("../../services/productService");
const categoryService = require("../../services/productCategoryService");
const colorService = require("../../services/productColorService");
const sizeService = require("../../services/productSizeService");
const AppError = require("../../utils/appError");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const productsPromise = productService.getAll(
    { status: "active" },
    {
      sort: "-ordering -createdAt",
      populate: { path: "category", model: "ProductCategory" },
    }
  );

  const categoriesPromise = categoryService.getAll();
  const colorsPromise = colorService.getAll();
  const sizesPromise = sizeService.getAll();

  const [products, categories, colors, sizes] = await Promise.all([
    productsPromise,
    categoriesPromise,
    colorsPromise,
    sizesPromise,
  ]);

  res.render("frontend/pages/products/index", {
    title: "Danh sách sản phẩm",
    products,
    categories,
    colors,
    sizes,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { slug } = req.params;
  const { id } = req.query;

  const productQuery = id ? { _id: id } : { slug };
  const productPromise = productService.getOneWithPopulates(productQuery);

  const relatedProductsPromise = productService.getRelatedProducts(id, slug);

  const [product, relatedProducts] = await Promise.all([
    productPromise,
    relatedProductsPromise,
  ]);

  if (!product) {
    return next(new AppError(404, "Không tìm thấy sản phẩm"));
  }

  res.render("frontend/pages/product/index", {
    title: product.name,
    product,
    relatedProducts,
  });
});

exports.filterAndSearchAjax = catchAsync(async (req, res, next) => {
  const { category, color, search, sort, price } = req.body;
  // console.log(req.body);

  const filter = { status: "active" };
  const option = { sort: "-ordering -createdAt" };

  if (category) filter.category = category;
  if (price) {
    const priceRange = price.split("-");
    filter.price = {
      $gte: priceRange[0],
      $lte: priceRange[1],
    };
  }
  if (category) filter.category = category;
  if (color) filter.color = color;
  // if (size) filter.sizes = { $in: [size] };
  if (search) filter.name = { $regex: search, $options: "i" };
  if (sort) option.sort = sort;

  const products = await productService.getAll(filter, option);
  // console.log("products", products);

  res.send({
    status: "success",
    products,
  });
});
