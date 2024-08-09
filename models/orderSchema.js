var mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },

  shippingInfo: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  orderItems: [
    {
      name: {
        type: String,
      },
      price: {
        type: String,
      },
      quantity: {
        type: String,
      },
      product_Id: {
        type: mongoose.Schema.ObjectId,
        ref: "Products",
      },
    },
  ],
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
