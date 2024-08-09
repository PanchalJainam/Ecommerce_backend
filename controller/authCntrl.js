// const Users = require("../models/userSchema");

const Users = require("../models/userSchema");
const jwt = require("jsonwebtoken");

// post data api
exports.add = async (req, res) => {
  console.log(req.file, 14);
  const { name, email, password, cpassword, address, country, city, phone } =
    req.body;

  // console.log(img);
  console.log(req.body);

  try {
    if (req.file) {
      let img = req.file.filename;
      const userExist = await Users.findOne({ email: email });
      if (userExist) {
        res.send({ message: "Users is already exist" });
      } else {
        if (
          !name ||
          !email ||
          !password ||
          !address ||
          !country ||
          !city ||
          !phone ||
          !img
        ) {
          res.send({ error: "All Fields Are Must Be Required.!" });
        } else if (password !== cpassword) {
          res.send({ error: "Password is not matched" });
        } else {
          const user = new Users({
            name,
            email,
            password,
            profile_img: img,
            address,
            country,
            city,
            phone,
          });
          await user.save();
          res.send(user);
        }
      }
    } else {
      res.send({ error: "File Must be Required" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await Users.findOne({ email: email });

    const name = userExist.name;

    if (!userExist) {
      res.send({ err: "User Not Registerd" });
    }
    if (userExist.password !== password) {
      res.send({ err: "Passeord is not matched" });
    } else {
      const token = jwt.sign(
        { userID: userExist?._id },
        "vertifiacationtoken",
        {
          expiresIn: "1h",
        }
      );

      res.send({
        success: true,
        message: "Successfully Login",
        name,
        email,
        address: userExist.address,
        city: userExist.city,
        country: userExist.country,
        phone: userExist.phone,
        id: userExist._id,
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// get details api

exports.details = async (req, res) => {
  try {
    const user = await Users.find();
    res.send({ user });
  } catch (error) {
    console.log(error);
  }
};

// get particular User details api

exports.info = async (req, res) => {
  try {
    if (req.params) {
      const { id } = req.params;
      const user = await Users.findOne({ _id: id }).select("-password");
      res.send({ user });
    } else {
      const { id } = req.body;
      const user = await Users.findOne({ _id: id }).select("-password");
      res.send({ user });
    }
  } catch (error) {
    console.log(error);
  }
};

//update api

exports.update = async (req, res) => {
  try {
    const updateUser = await Users.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.send({ succes: true, updateUser });
  } catch (error) {
    console.log(error);
  }
};

//delete api
exports.remove = async (req, res) => {
  const id = req.params.id;
  try {
    const deltedUser = await Users.findOneAndDelete({ _id: id });
    res.send({ deltedUser });
  } catch (error) {
    console.log(error);
  }
};

exports.cartdata = async (req, res) => {
  try {
    const { cartList } = req.body;

    console.log(cartList);

    const myId = req.user;
    const userid = myId.toString();

    const user = await Users.findById({ _id: userid }).select("-password");
    // console.log(user);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else {
      user.usercartdata(
        cartList?.name,
        cartList?.brandname,
        cartList?.oldprice,
        cartList?.newprice,
        cartList?.category,
        cartList?.product_img
        // product[0].name,
        // product[0].brandname,
        // product[0].oldprice,
        // product[0].newprice,
        // product[0].category,
        // product[0].product_img
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
