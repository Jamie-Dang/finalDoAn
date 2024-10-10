const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
      default: "default.png",
    },
    price: { type: Number },
    description: {
      type: String,
    },
    ordering: {
      type: Number,
      min: 1,
      default: 1,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // category: {
    //   type: mongoose.Schema.ObjectId,
    // },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory" },
    color: { type: mongoose.Schema.Types.ObjectId, ref: "ProductColor" }, // Đảm bảo trường này có kiểu ObjectId và tham chiếu đến ProductColor
    sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductSize" }],
    isPriority: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
