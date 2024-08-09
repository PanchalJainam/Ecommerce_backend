const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: "rzp_test_rfAvn3e5i9gTNk",
  key_secret: "4T7Y0tIJ6kAHExKZNZrzVFEs",
});

exports.checkout = async (req, res) => {
  const { val } = req.body;
  console.log(req.body);
  const options = {
    amount: parseInt(val),
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    res.json({ success: true, order });
    console.log(order);
  } catch (error) {
    console.log(error);
  }
};

exports.verification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  console.log(req.body);

  // const body = razorpay_order_id + "|" + razorpay_payment_id;
  // const expectedSignature = crypto
  //   .createHmac("sha256", "4T7Y0tIJ6kAHExKZNZrzVFEs")
  //   .update(body.toString())
  //   .digest("hex");

  // console.log("sig ", razorpay_signature);
  // console.log("expected ", expectedSignature);

  // res.json({
  //   success: true,
  // });

  res.redirect(
    `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
  );
};
