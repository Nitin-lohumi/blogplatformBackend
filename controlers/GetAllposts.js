const posts = require("../model/PostModel");
const GetAllposts = async(req,res)=>{
try {
    const userPosts = await posts.find().sort({ createdAt: -1 }).populate("likes", "name");
    if(!userPosts){
        res.status(404).json({msg:"not a posts avilabel to show",sucess:false});
        return;
    }
    res.status(200).json([...userPosts]);
} catch (error) {
    console.log(error);
    res.status(404).json({msg:error,sucess:false});
}
}
module.exports = GetAllposts;
