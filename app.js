const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/images", express.static(__dirname + "/images"));

require("./db/connection");

app.use("/", router);

app.get("/", (req, res) => {
  console.log("hello ");
  res.send("hello");
});

app.listen(5000, (req, res) => {
  console.log("Server is running http://localhost:5000");
});
