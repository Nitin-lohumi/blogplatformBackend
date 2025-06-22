const Usermodel = require("../model/user_model");
const post = require("../model/PostModel");
const config_cloud = require("../config/CloudinaryConfig");
const UploadProfileImage =  async(req,res)=>{
  try {
    const base64Data = req.base64Data;
    const imageType = req.imageType;
    const id =req.params.id;
    const public_id = "profile"+id;
    const format = 'jpg';
    const result = await config_cloud.uploader.upload(`data:image/${imageType};base64,${base64Data}`, {
      folder: 'ProfileImages',
      format:format, 
      public_id: public_id, 
      overwrite: true
    });
    if(!result.secure_url){
      res.status(500).json({ message: 'Error uploading to Cloudinary' ,susess:false});
    }
    const image = await Usermodel.findByIdAndUpdate(id,{picture:result.secure_url},{new:true});
    const postImage = await post.findOne({uploadByUserID:id});
    if(postImage){
      postImage.profile_picture=image.picture;
      console.log(postImage.profile_picture);
      postImage.save(); 
    }
    if(!image){
      res.status(500).json({ message: "Error for updating in database ",susess:false });
    }
    res.status(200).json({
      message: 'Image uploaded successfully',
      fileUrl: image.picture,
      sucess:true 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading to Cloudinary', error: error.message });
  }
}
module.exports = UploadProfileImage;