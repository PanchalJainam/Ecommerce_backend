const express = require("express");
const { productImg } = require("../middleware/products");
const router = express.Router();

const {
  add,
  get,
  edit,
  viewproduct,
  delproduct,
} = require("../controller/productCntrl");
// const { verify } = require("../middleware/authMiddleware");

router.post("/add", productImg, add);
router.get("/view", get);
router.get("/view/:id", viewproduct);
router.put("/edit/:id", edit);
router.delete("/delete/:id", delproduct);

module.exports = router;
