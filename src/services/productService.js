const { default: mongoose } = require("mongoose");
const mainModel = require("../models/productModel");

exports.getAllWithPopulates = async (queryObj = {}, options) => {
  try {
    const query = mainModel.find(queryObj);

    if (options?.limit) {
      query.limit(options?.limit);
    }

    if (options?.skip) {
      query.skip(options?.skip);
    }

    query.populate({ path: "category", model: "ProductCategory" });
    query.populate({ path: "color", model: "ProductColor" });
    query.populate({ path: "sizes", model: "ProductSize" });

    if (options?.sort) {
      query.sort(options?.sort);
    }

    return await query.exec();
  } catch (error) {
    console.log(error);
  }
};

exports.getAll = async (queryObj = {}, options) => {
  try {
    const query = mainModel.find(queryObj);

    // if (options?.sample) {
    //   query.sample(options?.sample);
    // }

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

exports.getRelatedProducts = async (id, slug) => {
  const match = id
    ? { _id: { $ne: new mongoose.Types.ObjectId(id) } }
    : { slug: { $ne: slug } };

  return await mainModel.aggregate([
    { $match: { ...match, status: "active" } },
    { $sample: { size: 3 } },
  ]);
};

exports.getOneWithPopulates = async (queryObj) => {
  try {
    const query = mainModel.findOne(queryObj);

    query.populate({ path: "category", model: "ProductCategory" });
    query.populate({ path: "color", model: "ProductColor" });
    query.populate({ path: "sizes", model: "ProductSize" });

    return await query.exec();
  } catch (error) {}
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
    .limit(3);
};
