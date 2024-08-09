const express = require("express");
const router = express.Router();

const { createOrder } = require("../controller/orderCntrl");

router.post("/create", createOrder);

module.exports = router;
