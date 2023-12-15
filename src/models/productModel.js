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
    // subImages: {
    //   type: String,
    // },
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

    category: {
      type: mongoose.Schema.ObjectId,
    },
    color: {
      type: mongoose.Schema.ObjectId,
    },
    sizes: [
      {
        type: mongoose.Schema.ObjectId,
      },
    ],
    isPriority: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
