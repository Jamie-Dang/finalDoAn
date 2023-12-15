const mongoose = require("mongoose");

const discountCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["fixed", "percentage"],
      default: "fixed",
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    used: {
      type: Number,
      required: true,
      default: 0,
    },
    startedAt: {
      type: Date,
      required: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DiscountCode = mongoose.model("DiscountCode", discountCodeSchema);

module.exports = DiscountCode;
