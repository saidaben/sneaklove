const express = require("express");
const router = new express.Router();
const sneakerModel = require("../models/Sneaker");
const uploader = require("../config/cloudinary");




router.get("/sneakers/women", (req, res) => {
 sneakerModel 
    .find()
    .then((dbRes) => {
      console.log(" tous les products >>>>>>>", dbRes);
      res.render("products", { sneakers : dbRes }); 
    })
    
    .catch((dbErr) => console.log(dbErr));
});

//juste pour pouvoir poster un produit et le voir apparaître 
//dans la page women
//j'affiche la page qui sert à insérer de nouveaux produits 
router.get("/products_add", (req, res) => {
    sneakerModel 
       .find()
       .then((dbRes) => {
         console.log(" tous les products >>>>>>>", dbRes);
         res.render("products_add", { sneakers : dbRes }); 
       })
       .catch((dbErr) => console.log(dbErr));
   });

//je poste un produit et comme c la page products qui me sert
//les products je redirige mon resulat dans products
router.post("/prod-add", (req, res) => {
    sneakerModel
      .create(req.body)
      .then((dbRes) => {
        console.log("produit ajouté en bdd >>> ", dbRes);
        res.redirect("/sneakers/women");
      })
      .catch((dbErr) => console.error(dbErr));
  });
 

  module.exports = router;