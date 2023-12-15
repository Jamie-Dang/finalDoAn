const mongoose = require("mongoose");

const productSizeSchema = mongoose.Schema(
  {
    name: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductSize", productSizeSchema);
