const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
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
            res.redirect("/products")
        })
        .catch((dbErr) => console.error(dbErr));

});

//ok
router.get("/products_manage",(req, res, next) => {
        sneakerModel
            .find()
            .populate("sneaker")
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