const express = require("express");
const router = express.Router();
// const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");



router.get("/", (req, res) => {
  res.render("index");
});

router.get("/products/:id", (req, res) => {
  res.send("bar");
});

router.get("/one-product/:id", (req, res) => {
  res.send("baz");
});

router.get("/signup", (req, res) => {
  res.send("sneak");
});

router.get("/signin", (req, res) => {
  res.send("love");
});


module.exports = router;
