const Post = require("../model/PostModel");
const User = require("../model/user_model");
const uploadPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const uploadByUserID = req.params.id;
    const { path: image, filename: publicId } = req.file;
    
    const userProfile = await User.findOne({_id:uploadByUserID});
    const posts_UserName = userProfile.name;
    const profile_picture = userProfile.picture;
    const totalLikes=0;
    if(!userProfile){
      res.status(404).json({
        message: "not found profile error",
        sucess: false,
      });
    }
    const savedData = { uploadByUserID,posts_UserName,profile_picture,title,description,image,publicId,totalLikes};

    if (!savedData) {
      res.status(400).json({
        message: "saved error",
        sucess: false,
      });
    }

    const existingPost = await Post.findOne({ $or: [{ title }] });

    if (existingPost) {
      return res.status(400).json({
        message: 'A post with this title or image already exists',sucess:false
      });
    }
    const Postmodel = new Post(savedData);
    await Postmodel.save();
    res.status(209).json({ msg: "sucessfully posted",sucess:true});
  } catch (error) {
    res.status(500).json({
      message: "internal error",
      error,
      sucess: false,
    });
  }
};
module.exports = uploadPost;
