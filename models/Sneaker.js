// Sneaker {  
//     name: String,  
//     ref: String,  
//     size: Number,  
//     description: String,  
//     price: Number,  
//     category: String [men, women, kids],  
//     id_tags: [ObjectId]  
//     }

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    name: String,  
    ref: String,  
    size: Number,  
    description: String,  
    price: Number,  

        category:{
             String: ["men", "women", "kids"]
   },
            //  id_tags:{
            //      object: [ObjectId]},  
            // id_tags: {
            //     type: mongoose.Schema.Types.ObjectId,
            //     ref:"Tag",
            //   },

});

// id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//     }

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;