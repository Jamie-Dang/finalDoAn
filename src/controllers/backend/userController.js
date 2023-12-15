const { validationResult } = require("express-validator");
const mainConfig = require("../../configs/userConfig");
const mainService = require("../../services/userService");

exports.getAll = async (req, res, next) => {
  const { search, page = 1, limit = 5 } = req.query;
  const { role } = req.params;

  const filterRole = JSON.parse(JSON.stringify(mainConfig.FILTER_ROLE_ARR));

  // Add count
  for (const statusItem of filterRole) {
    if (statusItem.value == "all") {
      statusItem.count = await mainService.count({});
    } else {
      console.log("statusItem.value", statusItem.value);
      statusItem.count = await mainService.count({ role: statusItem.value });
    }
  }
  // console.log(filterRole);

  // Selected status
  if (role && role != "all") {
    const selectedIdx = filterRole.findIndex(
      (statusItem) => statusItem.value == role
    );
    filterRole[selectedIdx].selected = true;
    filterRole[0].selected = false;
  }

  // Create query
  const query = { _id: { $ne: req.user._id } };
  if (search) {
    query.name = new RegExp(search, "ig");
  }
  if (role && role != "all") {
    query.role = role;
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
    filterRole,
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

  res.render(mainConfig.FORM_VIEW_PATH, {
    title: id ? mainConfig.TITLE_EDIT_FORM : mainConfig.TITLE_ADD_FORM,
    data,
    id,
  });
};

exports.saveData = async (req, res, next) => {
  const { id, name, email, address, phone, role } = req.body;
  console.log(req.body);

  const filteredBody = { name, email, address, phone, role };

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
