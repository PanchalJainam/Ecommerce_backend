const express = require("express");
const router = express.Router();

const auth = require("./authRoute");
const products = require("./productRoute");
const paymentRoute = require("./paymentRoute");
const order = require("./orderRoute");

router.use("/user", auth);
router.use("/product", products);
router.use("/payment", paymentRoute);
router.use("/order", order);

module.exports = router;
