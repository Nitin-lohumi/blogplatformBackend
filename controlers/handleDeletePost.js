const Post  = require("../model/PostModel");
const handleDeletePost =async(req,res)=>{
  try {
    const { id } = req.params;
    const isPost = await Post.findByIdAndDelete(id);
    if(isPost){
        res.status(200).json({msg:"Deleted sucessfully",see:id});
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = handleDeletePost;