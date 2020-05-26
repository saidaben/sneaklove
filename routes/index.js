const express = require("express");
const router = express.Router();



//ok
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/sneakers/women", (req, res) => {
  res.render("products");
});
router.get("/sneakers/men", (req, res) => {
  res.render("products");
});
router.get("/sneakers/kids", (req, res) => {
  res.render("products");
});
router.get("/sneaker/collection", (req, res) => {
  res.render("products");
});
router.get("/products_add", (req, res) => {
  res.render("products_add");
});
router.get("/product_edit", (req, res) => {
  res.render("product_edit");
});
//ok
// router.get("/products/:id", (req, res) => {
//   res.render("products");
// });

//ok
router.get("/one_product/:id", (req, res) => {
  res.render("one_product");
});

//ok je l ai sortie de partial 
router.get("/sneaker_mini", (req, res) => {
  res.render("sneaker_mini");
});






module.exports = router;