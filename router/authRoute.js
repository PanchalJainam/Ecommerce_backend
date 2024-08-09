const express = require("express");
const router = express.Router();

const {
  add,
  details,
  remove,
  update,
  login,
  cartdata,
  info,
} = require("../controller/authCntrl");
const { userProfile } = require("../middleware/profile");
const { verify } = require("../middleware/authMiddleware.js");

router.post("/register", userProfile, add);
router.post("/signin", login);
router.post("/cart", verify, cartdata);
router.get("/getuser", details);
router.get("/infouser/:id", info);
router.delete("/delete/:id", remove);
router.put("/update/:id", update);

module.exports = router;
