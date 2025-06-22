const user = require("../model/user_model");
const validateBlogPost = async(req,res,next)=>{
    try {
     const id = req.params.id;
     const postId = req.params.postId;
     if(!id&&!postId){
        res.status(404).json({msg:"invalid Id",sucess:false});
        return;
     }
     if(id){
        const check = await user.findOne({_id:id});
        if(!check){
            res.status(404).json({msg:"not a valid user",sucess:false});  
            return;
         }
    }
     next();
    } catch (error) {
        res.status(500).json({msg:error,sucess:false});  
    }
}
module.exports = validateBlogPost;