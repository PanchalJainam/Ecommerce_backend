const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  brandname: {
    type: String,
  },
  oldprice: {
    type: String,
  },
  newprice: {
    type: String,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  product_img: {
    type: Array,
  },
});

const Products = mongoose.model("Products", productSchema);
module.exports = Products;
