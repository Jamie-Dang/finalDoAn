const { validationResult } = require("express-validator");
const mainConfig = require("../../configs/discountCodeConfig");
const mainService = require("../../services/discountCodeService");

exports.getAll = async (req, res, next) => {
  const { search, page = 1, limit = 10 } = req.query;
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

  // Execute
  const totalCount = await mainService.count(query);
  const data = await mainService.getAll(query, {
    sort: "-createdAt",
    limit: +limit,
    skip: (page - 1) * limit,
  });

  res.render(mainConfig.LIST_VIEW_PATH, {
    title: mainConfig.TITLE_LIST,
    data,
    filterStatus: filterStatus,
    search,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: +page,
  });
};

exports.getForm = async (req, res, next) => {
  const { id } = req.params;

  let data = {};
  if (id) {
    data = await mainService.getOne({ _id: id });
  }

  console.log(data);

  res.render(mainConfig.FORM_VIEW_PATH, {
    title: id ? mainConfig.TITLE_EDIT_FORM : mainConfig.TITLE_ADD_FORM,
    data,
    id,
  });
};

exports.saveData = async (req, res, next) => {
  const { id, code, type, discount, quantity, used, startedAt, expiredAt } =
    req.body;

  const filteredBody = {
    code,
    type,
    discount,
    quantity,
    used,
    startedAt,
    expiredAt,
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const alert = errors.array();

    return res.render(mainConfig.FORM_VIEW_PATH, {
      title: id ? mainConfig.TITLE_EDIT_FORM : mainConfig.TITLE_ADD_FORM,
      data: filteredBody,
      id,
      alert,
    });
  }

  if (id) {
    await mainService.updateOne({ _id: id }, filteredBody);
  } else {
    await mainService.create(filteredBody);
  }

  res.redirect(mainConfig.LIST_PATH);
};

exports.deleteData = async (req, res, next) => {
  const { id } = req.params;

  await mainService.deleteOne({ _id: id });

  res.redirect(mainConfig.LIST_PATH);
};
