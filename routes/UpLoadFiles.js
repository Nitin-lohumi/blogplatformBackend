const express = require('express');
const files = express.Router();
require("../config/CloudinaryConfig");
const validateImage = require("../middleware/ValidateImage");
const UploadProfileImage = require("../controlers/UploadProfileImage");
const validatePost = require("../middleware/validatePost");
const uploadPost = require("../controlers/uploadPost");
const verifyUser = require("../middleware/ValidateJWT")
files.post('/Profile/:id',verifyUser,validateImage,UploadProfileImage);
files.post("/post/:id",verifyUser,validatePost,uploadPost);
module.exports = files;