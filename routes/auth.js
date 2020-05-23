const express = require("express");
const router = new express.Router();
module.exports = router;
const userModel = require("./../models/User");

//ok
router.get("/signup", (req, res) => {
    res.render("signup");
  });
  
  //ok
  router.get("/signin", (req, res) => {
    res.render("signin");
  });

//ok
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
  
  //ok
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
