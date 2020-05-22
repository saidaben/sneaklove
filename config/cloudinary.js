//npm install cloudinary multer-storage-cloudinary multer

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = cloudinaryStorage({
    cloudinary,
    folder: "user-pictures",
    //ci dessous si besoin duplod video
    //params:{ ressource_type: "raw" }
});

const fileUploader = multer({ storage });
module.exports = fileUploader;