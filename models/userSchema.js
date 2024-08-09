const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: String,
  },
  profile_img: {
    type: String,
  },
  termConditions: {
    type: Boolean,
  },
  cartData: [
    {
      name: {
        type: String,
        default: "",
      },
      brandname: {
        type: String,
        default: "",
      },
      oldprice: {
        type: String,
        default: "",
      },
      newprice: {
        type: String,
        default: "",
      },
      category: {
        type: String,
        default: "",
      },
      product_img: {
        type: Array,
      },
    },
  ],
});

userSchema.methods.usercartdata = async function (
  name,
  brandname,
  oldprice,
  newprice,
  category,
  product_img
) {
  try {
    this.cartData = this.cartData.concat({
      name: name,
      brandname: brandname,
      oldprice: oldprice,
      newprice: newprice,
      category: category,
      product_img: product_img,
    });
    await this.save();
    return this.cartData;
  } catch (error) {
    console.log(error);
  }
};

const Users = mongoose.model("User", userSchema);
module.exports = Users;
