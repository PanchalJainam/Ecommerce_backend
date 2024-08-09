const Products = require("../models/productSchema");
const path = require("path");
const fs = require("fs");

//-----------------------------PRODUCT ADD API--------------------
exports.add = async (req, res) => {
  const { name, brandname, category, oldprice, newprice } = req.body;
  console.log(req.body);
  console.log(req.files);
  try {
    const subimg = [];
    req.files &&
      req.files.map((file) => {
        console.log(file);
        subimg.push(file.filename);
      });

    if (!name || !brandname || !oldprice || !newprice || !category) {
      res.send({ error: "Please Filled all Details" });
    } else {
      const product = new Products({
        name,
        brandname,
        oldprice,
        newprice,
        category,
        product_img: subimg,
      });

      await product.save();
      res.send({ product });
    }
  } catch (error) {
    console.log(error);
  }
};

//PRODUCT GET API
exports.get = async (req, res) => {
  const search = req.query.search;
  const category = req.query.category;
  const query = {
    name: { $regex: search, $options: "i" },
  };

  // if (category === "All") {
  //   query.category = category;
  // } else if (category !== "All") {
  //   query.category = category;
  // }

  // const product = await Products.find(query);
  // const all_data = await Products.countDocuments();
  // res.send({ product, all_data });

  if (search) {
    const product = await Products.find(query);
    res.send({ product });
  }
  // else if (search === "" && category !== "All") {
  //   const product = await Products.find();
  //   res.send({ product }, 57);
  // }
  else if (category && category !== "All") {
    query.category = category;
    const product = await Products.find(query);
    res.send({ product });
  } else if (search && category) {
    query.category = category;
    const product = await Products.find(query);
    res.send({ product });
  } else {
    const product = await Products.find();
    res.send({ product });
  }

  // if (search === "" && category === "All") {
  //   const product = await Products.find();
  //   res.send({ product });
  // } else {
  //   const product = await Products.find(query);
  //   res.send({ product, all_data });
  // }
  // } catch (error) {
  //   console.log(error);
  // }
};

//--------------------------PRODUCT UPDATE API-------------------------
exports.edit = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.files) {
      const subimg = [];

      req.files &&
        req.files.map((file) => {
          subimg.push(file.filename);
        });
      const update = await Products.findByIdAndUpdate(
        { _id: id },
        { ...req.body, image: subimg }
      );
      res.json({ success: true, message: "Change successful", update });
    } else {
      const update = await Products.findByIdAndUpdate({ _id: id }, req.body);
      res.json({ success: true, message: "Change successful", update });
    }
  } catch (error) {
    console.log(error);
  }
};

//------------------PRATICULARE PRODUCT VIEW API--------------------

exports.viewproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById({ _id: id });
    console.log(product);
    res.json({ product });
  } catch (err) {
    res.json({ success: false });
  }
};

//------------------------------DELETE PRODUCT API---------------------

exports.delproduct = async (req, res) => {
  try {
    // const { data } = req.body;
    console.log(req.params.id);
    const product = await Products.findById({ _id: req.params.id });
    const folder =
      "C:\\Users\\jaina\\OneDrive\\Desktop\\eshopper\\server\\images\\product";
    const prdimg = product.product_img[0];
    const imagePath = path.join(folder, prdimg);

    if (fs.existsSync(imagePath)) {
      for (let i = 0; i < product.product_img.length; i++) {
        const mainPath = path.join(folder, product.product_img[i]);

        fs.unlink(mainPath, (err) => {
          if (err) {
            console.error("Error while removing the file:", err);
          } else {
            console.log("File removed successfully.");
          }
        });
      }
      await Products.findByIdAndDelete({ _id: req.params.id });
    } else {
      console.error("File does not exist.");
    }

    res.json({ product });
  } catch (err) {
    res.json({ success: false });
  }
};
