const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");
module.exports = router;



router.get("/products", (req, res, next) => {
    sneakerModel  
    .find() 
    .populate("category")
    .then((dbRes) =>
    res.render("products", {
      products: dbRes,
      title: "Gérer les produits",
    })
  )
  .catch(next);
}
);

router.get("/products_add", (req, res, next) => {
    sneakerModel  
      .find()
      .then((categories) =>
        res.render("products_add", {
          categories,
          title: "Créer un produit",
        })
      )
      .catch(next);
  });

  router.get("/product_edit", (req, res, next) => {
    sneakerModel  
      .find()
      .then((categories) =>
        res.render("product_edit", {
          categories,
          title: "editer un produit",
        })
      )
      .catch(next);
  });

  router.post("/product_edit", (req, res) => {
    const sneaker = req.body;
    sneakerModel  
    .create(sneaker)
    .then((dbRes) => {
    req.flash("success", "ok");
    res.redirect("/products")
  })
        .catch((dbErr) => console.error(dbErr));
        
    });


    router.post("/products_add", (req, res) => {
        const sneaker = req.body;
        sneakerModel  
        .create(sneaker)
        .then((dbRes) => {
        req.flash("success", "ok");
        res.redirect("/products")
      })
            .catch((dbErr) => console.error(dbErr));
            
        });