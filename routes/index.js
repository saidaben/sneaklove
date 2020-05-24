const express = require("express");
const router = express.Router();



//ok
router.get("/", (req, res) => {
  res.render("index");
});

//ok
router.get("/products/:id", (req, res) => {
  res.render("products");
});

//ok
router.get("/one_product/:id", (req, res) => {
  res.render("one_product");
});

//ok je l ai sortie de partial 
router.get("/sneaker_mini", (req, res) => {
  res.render("sneaker_mini");
});






module.exports = router;