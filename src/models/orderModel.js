const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Order must have a name"],
    },
    phone: {
      type: String,
      required: [true, "Order must have a phone"],
    },
    address: {
      type: String,
      required: [true, "Order must have a address"],
    },
    shippingFee: {
      type: Number,
      required: [true, "Order must have a shippingFee"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          // ref: "Product",
          required: [true, "Order must belong to a product!"],
        },
        size: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          required: [true, "Order must have a price"],
        },
      },
    ],
    discountCode: {
      type: String,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: [true, "Order must have a total"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },

  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
