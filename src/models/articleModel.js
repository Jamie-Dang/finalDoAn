const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
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
      default: "inactive",
    },
    image: {
      type: String,
      default: "default.png",
    },
    category: {
      type: mongoose.Schema.ObjectId,
    },
    isPriority: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
