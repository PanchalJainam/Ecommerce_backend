const multer = require("multer");
const path = require("path");

const products = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../images/product"));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() +
          Math.round(Math.random() * 100000) +
          "." +
          file.originalname.split(".").at(-1)
      );
    },
  }),
});

const productImg = products.array("product_img");
module.exports = { productImg };
