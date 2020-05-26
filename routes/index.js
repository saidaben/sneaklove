const express = require("express");
const router = express.Router();
const sneakerModel = require('./../models/Sneaker');


//ok
router.get("/", (req, res) => {
  res.render("index");
});
router.get("/sneakers/women", (req, res, next) => {
  
  
});



router.get("/sneakers/kids", (req, res, next) => {
  sneakerModel.find()
  .then(sneakers => res.render("products", {sneakers}))
  .catch(next);
});

router.get("/sneaker/collection", (req, res, next) => {
  sneakerModel.find()
  .then(sneakers => res.render("products", {sneakers}))
  .catch(next);
});
// router.get("/products_add", (req, res) => {
//   res.render("products_add");
// });
// router.get("/product_edit", (req, res) => {
//   res.render("product_edit");
// });


//ok
// router.get("/one_product/:id", (req, res) => {
//   res.render("one_product");
// });

// //ok je l ai sortie de partial 
// router.get("/sneaker_mini", (req, res) => {
//   res.render("sneaker_mini");
// });






module.exports = router;