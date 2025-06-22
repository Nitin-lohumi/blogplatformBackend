const joi = require("joi");
const config_cloud = require("../config/CloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { v2: cloudinary } = require("cloudinary");
const multer = require('multer');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'UploadedPost_Image',   
        allowed_formats: ['jpg', 'png','jpeg'], 
        // transformation: [{ width: 500, height: 500, crop: 'limit' }], // Optional image transformations
      },
  });
const validatePost =(req, res, next)=>{

    const upload = multer({ storage }).single('image');

    upload(req,res,(err)=>{
        if(err){
            return res.status(400).json({ msg: "photo upload error: " + err,sucess:false });
        }
        const signupScheema = joi.object({
            title:joi.string().required(),
            description:joi.string().optional(),
        });
        const {error} = signupScheema.validate(req.body);
        if(error){
            return res.status(400).json({ message: "Fill title or description or image ", error ,sucess:false});
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image is required for post" ,sucess:false});
        }
        next();
    });
};
module.exports = validatePost;