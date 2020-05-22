const express = require("express");
const router = express.Router();
const userModel = require("./../models/User");
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
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


router.get("/partial/shop_head", (req, res) => {
  res.send("love");
});


router.post("/signup", (req, res) => {
  const user = req.body;
  userModel
  .create(user)
  .then((dbRes) => {
    console.log("<<<<<", user)
  req.flash("success", "Inscription validée!");
  res.redirect("signin")
})
      .catch((dbErr) => console.error(dbErr));
      
  });


  router.post("/signin", (req, res) => {
    const user = req.body;
    userModel
    .create(user)
    .then((dbRes) => {
    req.flash("success", "connexion ok!");
    res.redirect("/")
  })
        .catch((dbErr) => console.error(dbErr));
        
    });


module.exports = router;
