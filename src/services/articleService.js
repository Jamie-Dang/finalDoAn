const mainModel = require("../models/articleModel");

exports.getAll = async (queryObj = {}, options) => {
  try {
    const query = mainModel.find(queryObj);

    if (options?.limit) {
      query.limit(options?.limit);
    }

    if (options?.skip) {
      query.skip(options?.skip);
    }

    if (options?.populate) {
      query.populate(options?.populate);
    }

    if (options?.sort) {
      query.sort(options?.sort);
    }

    return await query.exec();
  } catch (error) {
    console.log(error);
  }
};

exports.getOne = async (query) => {
  try {
    const item = await mainModel.findOne(query);
    return item;
  } catch (error) {
    return null;
  }
};

exports.create = async (dataObj) => {
  return await mainModel.create(dataObj);
};

exports.updateOne = async (query, body, options) => {
  try {
    return await mainModel.findOneAndUpdate(query, body, options);
  } catch (error) {
    throw error;
  }
};

exports.deleteOne = async (query) => {
  try {
    return await mainModel.findOneAndDelete(query);
  } catch (error) {}
};

exports.count = async (query) => {
  return await mainModel.count(query);
};

exports.getArticlesForHomePage = async () => {
  return await mainModel
    .find({ status: "active" })
    .sort({ isPriority: -1, createdAt: -1 })
    .limit(3)
    .populate({ path: "category", model: "ArticleCategory" });
};