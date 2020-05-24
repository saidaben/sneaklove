














const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const uploader = require("./../config/cloudinary");
const sneakerModel = require("./../models/Sneaker");



//ok
router.get("/products", (req, res, next) => {
    sneakerModel
        .find()
        .then((dbRes) =>
            res.render("products", {
                products: dbRes,
                title: "Gérer les produits",
            })
        )
        .catch(next);
});

//okk 
router.get("/products_add", (req, res, next) => {
    sneakerModel
        .find()
        .then(() =>
            res.render("products_add", {

                title: "Créer un produit",
            })
        ) 
        .catch(next);
});



// router.get("/product_edit/:id", (req, res) => {
//     sneakerModel.findById(req.params.id)
//         .then(dbRes => {
//             res.render("product_edit", {
//                 product: dbRes
//             })
//         })
//         .catch(dbErr => console.error(dbErr))
// });



//erreur: Cast to ObjectId failed for value ":id" at path "_id" for model "Sneaker"

router.get( "/product_edit/:id",(req, res, next) => {
      Promise.all([sneakerModel.findById(req.params.id)])
        .then((dbResponses) => {
          res.render("product_edit/:id", {
            product: dbResponses[0], 
            title: "Editer un produit",
          });
        })
        .catch(next); 
    }
    );
router.post("/product_edit/:id", (req, res, next) => {

    sneakerModel
        .findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect("/products_manage"))
    .catch(next);
});



// a voir, on peu pas voir tant que le edit marche pas 
router.post("/product/delete/:id", (req, res, next) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/products_manage"))
        .catch(next);
});

//ok
router.post("/products_add", (req, res) => {
    const sneaker = req.body;
    sneakerModel
        .create(sneaker)
        .then((dbRes) => {
            req.flash("success", "ok");
            res.redirect("/products_manage")
        })
        .catch((dbErr) => console.error(dbErr));

});

//ok
router.get("/products_manage",(req, res, next) => {
        sneakerModel
            .find()
            .populate("products")
            .then((dbRes) =>
                res.render("products_manage", {
                    products: dbRes,
                    title: "Gérer les produits",
                })
            )
            .catch(next);
    }
);

module.exports = router;


//teste  latifa code/////////////////////////////////////////////////ne marche pas

router.post("/products", uploader.single("image"), (req, res, next) => {
    const newProduct = { ...req.body };
    // prend toutes les clés valeur contenues dans req.body et copie les dans un nouvel objet nommé newProduct
  
    // si l'utilisateur a uploadé un fichier, req.file ne sera pas undefined : il vaudra un objet représentant le fichier uploadé sur votre compte cloudinary
    if (req.file) newProduct.image = req.file.secure_url; // on associe l'url de l'image en https @cloudinary
    
    // console.log(">>> fichier posté ? >>>", req.file);
    // console.log(">>> nouveau produit >>> ", newProduct);
  
    productModel
      .create(newProduct)
      .then((dbRes) => {
        // console.log("produit ajouté en bdd >>> ", dbRes);
        res.redirect("/products-manage");
      })
      .catch(next);
  });


  router.get("/sneaker_mini/:id", async (req, res, next) => {
    // le callback est "décoré" du mot-clé async
    try {
      const products = await sneakerModel.findById(req.params.id);
      // ci-dessus, on attend (await) le resultat d'une action asynchrone
      res.render("produts-manage");
    } catch (dbErr) {
      next(dbErr);
    }
  });
  
