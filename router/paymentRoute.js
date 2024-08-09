const express = require("express");
const { checkout, verification } = require("../controller/paymentCntrl");
const router = express.Router();

router.post("/checkout", checkout);
router.post("/verification", verification);

module.exports = router;
