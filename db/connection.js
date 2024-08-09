const mongoose = require("mongoose");

mongoose
  .connect("Mongo_Uri")
  .then(() => {
    console.log("connect successfully");
  })
  .catch((e) => {
    console.log("somethingwent wrong" + e);
  });
