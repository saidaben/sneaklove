const express = require("express"); 
const router = new express.Router(); 
const uploader = require("./../config/cloudinary");
const sneakerModel = require("./../models/Sneaker");

//ok
// router.get("/products", (req, res, next) => {
//     sneakerModel
//       .find() 
//       .populate("category")
//       .then((dbRes) => {
//         console.log(" tous les products >ll>>", dbRes);
 
//         res.render("products", {
//           products: dbRes,
         
//         }); 
//       })
//       .catch(next);
//   });


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
// router.post("/products_add", (req, res) => {
//     sneakerModel
//       .create(req.body)
//       .then((dbRes) => {
//         console.log("produit ajouté en bdd >>> ", dbRes);
//         res.redirect("/products_manage");
//       })
//       .catch((dbErr) => console.error(dbErr));
//   });
 


router.post("/product/delete/:id", (req, res, next) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/products_manage"))
        .catch(next);
});




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
router.get("/products", (req, res) => {
    sneakerModel
    .create(req.body)
        .then((dbRes) => {
            res.render("/sneaker/collection",{sneakers:dbRes});
        })
        .catch(dbErr=>console.error(dbErr))
});

router.get("/sneakers/men", (req, res) => {
 sneakerModel 
    .find()
    .then((dbRes) => {
      console.log(" tous les products >>>>>>>", dbRes);
      res.render("products", { sneakers : dbRes }); 
    })
    
    .catch((dbErr) => console.log(dbErr));
});



router.get(
  "/product_edit/:id",
  (req, res, next) => {
    // promise.all va attendre la résolution de toutes les promesses passées en argument
    Promise.all([sneakerModel.findById(req.params.id)])
      .then((dbResponses) => {
        console.log(dbResponses)
        // les réponses sont fournies dans un Array dans le même ordre que l'Array fournit en argument du Promise.all()
        res.render("product_edit", {
          sneaker: dbResponses[0], // on accède donc au résultat avec les indices du tableau initial
          title: "Editer un produit",
        });
      })
      .catch(next); // toutes les promesses doivent être tenues, sinon le catch sera déclenché
  }
);

  //le id marche pas sinon il marche

  // 

  
// router.get("/product_edit/:id", (req, res) => {
//   sneakerModel.findByIdAndUpdate(req.params.id,req.body)
//       .then(dbRes=>res.redirect("/product_edit"))
//       .catch(dbErr=>console.error(dbErr))
  
        
         
      
//  })

 router.post("/product_edit/:id", (req, res) => {
  sneakerModel.findByIdAndUpdate(req.params.id, req.body)
      .then(dbRes=>res.redirect("/products_manage"))
      .catch(dbErr=>console.error(dbErr))
 
 });

//  router.post("/product_edit/:id", uploader.single("image"), (req, res, next) => {
//   const updatedProduct = { ...req.body };
//   if (req.file) updatedProduct.image = req.file.secure_url;
  
//   // console.log(">>> fichier posté ? >>>", req.file);
//   // console.log(">>> nouveau mis à jour ? >>> ", updatedProduct);

//   productModel
//     .findByIdAndUpdate(req.params.id, updatedProduct)
//     .then(() => res.redirect("/products_manage"))
//     .catch(next);
// });
 

 
  

  








module.exports = router;