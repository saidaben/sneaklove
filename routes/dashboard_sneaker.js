const express = require("express"); 
const router = new express.Router(); 
const uploader = require("./../config/cloudinary");
const sneakerModel = require("./../models/Sneaker");



// ok
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

// okk 
// router.get("/products_add", (req, res, next) => {
//     sneakerModel
      
//         .then((dbRes) =>
//             res.render("products_add") 
//         .catch(next));
// });



router.get("/product_edit/:id", (req, res) => {
    sneakerModel.findById(req.params.id)
        .then(dbRes => {
            res.render("product_edit", {
                product: dbRes
            })
        })
        .catch(dbErr => console.error(dbErr))
});



// erreur: Cast to ObjectId failed for value ":id" at path "_id" for model "Sneaker"

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

// ok
// router.post("/productsadd", (req, res) => {
//     const sneaker = req.body;
//     sneakerModel
//         .create(req.body)
//         .then((dbRes) => {
         
//             res.redirect("/products_manage")
            
//         })
//         .catch((dbErr) => console.error(dbErr));

// });

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



//ok sa marche mais tjrs pas de produits donc on peu pas verifier

//teste  latifa code/////////////////////////////////////////////////ne marche pas

// router.post("/products", uploader.single("image"), (req, res, next) => {
//     const newProduct = { ...req.body };
    // prend toutes les clés valeur contenues dans req.body et copie les dans un nouvel objet nommé newProduct
  
    // si l'utilisateur a uploadé un fichier, req.file ne sera pas undefined : il vaudra un objet représentant le fichier uploadé sur votre compte cloudinary
    // if (req.file) newProduct.image = req.file.secure_url; // on associe l'url de l'image en https @cloudinary
    
    // console.log(">>> fichier posté ? >>>", req.file);
    // console.log(">>> nouveau produit >>> ", newProduct);
  
    // sneakerModel
    //   .create(newProduct)
    //   .then((dbRes) => {
        // console.log("produit ajouté en bdd >>> ", dbRes);
//         res.redirect("/products_manage");
//       })
//       .catch(next);
//   });


//   router.get("/sneaker_mini/:id", async (req, res, next) => {
    // le callback est "décoré" du mot-clé async
    // try {
    //   const products = await sneakerModel.findById(req.params.id);
      // ci-dessus, on attend (await) le resultat d'une action asynchrone
//       res.render("produts_manage");
//     } catch (dbErr) {
//       next(dbErr);
//     }
//   });

//   router.get("/products", (req, res, next) => {
//     productModel // productModel nous permet d'intéragir avec la collection product
    //   .find() // find() : récupère tous les documents de cette collection
    //   .populate("category")
    //   .then((dbRes) => {
        // console.log(" tous les products >>>", dbRes);
        // toutes les requête de DB mongoose sont asynchrones et retournent une promesse
        // donc on attend le résultat avant de générer (render) la vue
        // res.render("products", {
        //   products: dbRes,
        //   title: "Tous nos produits",
        // }); // on envoit le tableaux de produits à la vue pour les afficher !
//       })
//       .catch(next);
//   });
  

  
 

//   router.get("/", (req, res) => {
//     res.render("index");
//   });







module.exports = router;