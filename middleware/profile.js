const multer = require("multer");
const path = require("path");

const profile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../images/userProfile"));
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

const userProfile = profile.single('profile_img');
module.exports = { userProfile };
