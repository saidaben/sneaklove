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

//404? verifer la route
router.get("/partial/sneaker_mini", (req, res) => {
  res.render("/partial/sneaker_mini");
});

//404? pareil 
router.get("/partial/shop_head", (req, res) => {
  res.send("love");
});





module.exports = router;
