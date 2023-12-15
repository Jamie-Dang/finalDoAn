const { validationResult } = require("express-validator");
const mainConfig = require("../../configs/articleConfig");
const mainService = require("../../services/articleService");
const categoryService = require("../../services/articleCategoryService");
const { deleteImageFromServer } = require("../../utils/upload");

exports.getAll = async (req, res, next) => {
  const { category, search, page = 1, limit = 10 } = req.query;
  const { status } = req.params;

  const filterStatus = JSON.parse(JSON.stringify(mainConfig.FILTER_STATUS_ARR));

  // Add count
  for (const statusItem of filterStatus) {
    if (statusItem.value == "all") {
      statusItem.count = await mainService.count({});
    } else {
      statusItem.count = await mainService.count({ status: statusItem.value });
    }
  }

  // Selected status
  if (status && status != "all") {
    const selectedIdx = filterStatus.findIndex(
      (statusItem) => statusItem.value == status
    );
    filterStatus[selectedIdx].selected = true;
    filterStatus[0].selected = false;
  }

  // Create query
  const query = {};
  if (search) {
    query.name = new RegExp(search, "ig");
  }
  if (status && status != "all") {
    query.status = status;
  }
  if (category) {
    query.category = category;
  }

  // Execute
  const totalCount = await mainService.count(query);
  const data = await mainService.getAll(query, {
    sort: "-createdAt",
    limit: +limit,
    skip: (page - 1) * limit,
    populate: { path: "category", model: "ArticleCategory" },
  });

  console.log(data);

  const categories = await categoryService.getAll();

  res.render(mainConfig.LIST_VIEW_PATH, {
    title: mainConfig.TITLE_LIST,
    data,
    filterStatus: filterStatus,
    search,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: +page,
    categories,
    category,
  });
};

exports.getForm = async (req, res, next) => {
  const { id } = req.params;

  let data = {};
  if (id) {
    data = await mainService.getOne({ _id: id });
  }

  const categories = await categoryService.getAll();

  res.render(mainConfig.FORM_VIEW_PATH, {
    title: id ? mainConfig.TITLE_EDIT_FORM : mainConfig.TITLE_ADD_FORM,
    data,
    id,
    categories,
  });
};

exports.saveData = async (req, res, next) => {
  const { id, name, ordering, status, slug, category, isPriority, content } =
    req.body;

  const filteredBody = {
    name,
    ordering,
    status,
    slug,
    category,
    isPriority,
    content,
  };
  if (req.file) filteredBody.image = req.file.filename;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();

    if (!id && filteredBody.image) {
      deleteImageFromServer(mainConfig.NAME_COLLECTION, filteredBody.image);
    }

    const categories = await categoryService.getAll();

    return res.render(mainConfig.FORM_VIEW_PATH, {
      title: id ? mainConfig.TITLE_EDIT_FORM : mainConfig.TITLE_ADD_FORM,
      data: filteredBody,
      id,
      alert,
      categories,
    });
  }

  if (id) {
    const oldData = await mainService.updateOne({ _id: id }, filteredBody);
    if (oldData.image != mainConfig.NAME_DEFAULT_IMAGE && req.file) {
      deleteImageFromServer(mainConfig.NAME_COLLECTION, oldData.image);
    }
  } else {
    await mainService.create(filteredBody);
  }

  res.redirect(mainConfig.LIST_PATH);
};

exports.deleteData = async (req, res, next) => {
  const { id } = req.params;

  const deletedData = await mainService.deleteOne({ _id: id });
  if (deletedData.image != mainConfig.NAME_DEFAULT_IMAGE) {
    deleteImageFromServer(mainConfig.NAME_COLLECTION, deletedData.image);
  }

  res.redirect(mainConfig.LIST_PATH);
};

exports.changeStatusAjax = async (req, res, next) => {
  try {
    const { id, status } = req.params;
    const newStatus = status == "active" ? "inactive" : "active";
    await mainService.updateOne({ _id: id }, { status: newStatus });
    res.send({ data: "success", status: newStatus, id });
  } catch (error) {}
};

exports.changeOrderingAjax = async (req, res, next) => {
  try {
    const { id, ordering } = req.params;
    await mainService.updateOne(
      { _id: id },
      { ordering: +ordering },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );
    res.send({ data: "success", ordering, id });
  } catch (err) {
    const errors = err.errors;
    res.send(errors);
  }
};
