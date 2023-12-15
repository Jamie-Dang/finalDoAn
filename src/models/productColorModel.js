const mongoose = require("mongoose");

const productColorSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    hex: {
      type: String,
      default: "000000",
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

module.exports = mongoose.model("ProductColor", productColorSchema);
