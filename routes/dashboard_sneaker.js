const express = require("express"); 
const router = new express.Router(); 
const uploader = require("./../config/cloudinary");
const sneakerModel = require("./../models/Sneaker");

//ok
router.get("/products", (req, res, next) => {
    sneakerModel
      .find() 
      .then((dbRes) => {
        console.log(" tous les products >>>", dbRes);
 
        res.render("products", {
          products: dbRes,
          title: "Tous nos produits",
        }); 
      })
      .catch(next);
  });


//ok pas touche
router.get("/products_add", (req, res) => {
    sneakerModel 
       .find()
       .then((dbRes) => {
         console.log(" tous les products >>>>>>>", dbRes);
         res.render("products_add", { sneakers : dbRes }); 
       })
       .catch((dbErr) => console.log(dbErr));
   });


//ok pas touche
router.post("/products_add", (req, res) => {
    
    sneakerModel
      .create(req.body)
      .then((dbRes) => {
        console.log("produit ajouté en bdd >>> ", dbRes);
        res.redirect("/products_manage");
      })
      .catch((dbErr) => console.error(dbErr));
  });


// je poste un produit et comme c la page products qui me sert
// les products je redirige mon resulat dans products
router.post("/products_add", (req, res) => {
    sneakerModel
      .create(req.body)
      .then((dbRes) => {
        console.log("produit ajouté en bdd >>> ", dbRes);
        res.redirect("/products_manage");
      })
      .catch((dbErr) => console.error(dbErr));
  });
 


router.post("/product/delete/:id", (req, res, next) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/products_manage"))
        .catch(next);
});


router.post("/product_edit/:id", (req, res) => {
 sneakerModel.findByIdAndUpdate(req.params.id,req.body)
     .then(dbRes=>res.redirect("/product_edit"))
     .catch(dbErr=>console.error(dbErr))
 
       
        
     
})



// ok
router.get("/products_manage",(req, res, next) => {
        sneakerModel
            .find()
           
            .then((dbRes) =>
                res.render("products_manage", {
                    sneakers: dbRes,
                   
                })
            )
            .catch(next);
    }
);


///////////code teste////////////////////


// ok saffiche mais prends pas en compte les id 


router.get("/product_edit/:id", (req, res) => {
    sneakerModel.findById(req.params.id)
        .then((dbRes) => {
            res.render("/product_edit", {
                sneaker: dbRes
            })
        })
        .catch(dbErr=>console.error(dbErr))
});





  //le id marche pas sinon il marche

  router.get("/sneaker_mini/:id", async (req, res, next) => {

    try {
      const products = await sneakerModel.findById(req.params.id);

      res.render("produts_manage");
    } catch (dbErr) {
      next(dbErr);
    }
  });

 
  

  








module.exports = router;