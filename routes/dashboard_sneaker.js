const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require("./../models/Sneaker");



//ok
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
});

//okk mais categories je sais pas a quoi il se rapporte??
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



// router.get("/product_edit/:id", (req, res) => {
//     sneakerModel.findById(req.params.id)
//         .then(dbRes => {
//             res.render("product_edit", {
//                 product: dbRes
//             })
//         })
//         .catch(dbErr => console.error(dbErr))
// });



//404

router.get( "/product_edit/:id",(req, res, next) => {
      Promise.all([sneakerModel.findById(req.params.id)])
        .then((dbResponses) => {
          res.render("product_edit", {
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



// est ce quon doit faire route delete? a voir, on peu pas voir tant que le edit marche pas 
router.post("/product/delete/:id", (req, res, next) => {
    sneakerModel
        .findByIdAndDelete(req.params.id)
        .then((dbRes) => res.redirect("/products_manage"))
        .catch(next);
});

//ok mais pb de model, n'affiche pas les cléfs dans la bdd
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