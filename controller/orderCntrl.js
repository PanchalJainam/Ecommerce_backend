const Orders = require("../models/orderSchema");

exports.createOrder = async (req, res) => {
  try {
    console.log(req.body);
    // const data = req.body;

    const shipping = req.body.data;
    const product = req.body.cartList;

    for (const carValue of product) {
      const { name, price, quantity, _id } = carValue;
      const data = new Orders({
        user: req.body.data._id,
        shippingInfo: {
          address: shipping.address,
          country: shipping.country,
          city: shipping.city,
        },
        orderItems: {
          name,
          price,
          quantity,
          product_Id: _id,
        },
        // orderItems: {
        //   product_Id: product[0]._id,
        //   name: product[0].name,
        //   price: product[0].price,
        //   quantity: product[0].quantity,
        // },
      });

      product.forEach(async (carValue) => {
        const { name, price, quantity, _id } = carValue;
        const data = new Orders({
          user: req.body.data._id,
          shippingInfo: {
            address: shipping.address,
            country: shipping.country,
            city: shipping.city,
          },
          orderItems: {
            name,
            price,
            quantity,
            product_Id: _id,
          },
          // orderItems: {
          //   product_Id: product[0]._id,
          //   name: product[0].name,
          //   price: product[0].price,
          //   quantity: product[0].quantity,
          // },
        });
        await data.save();
        res.send({ success: true, data });
      });
    }
  } catch (error) {
    console.log(error);
    res.send({ error: error });
  }
};
