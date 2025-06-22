const Post = require("../model/PostModel");
const GetOnlyUserPosts =async(req,res)=>{
 try {
    // console.log(req.session.user);
    const userId = req.userId;
    const postsIncludedUserId = await Post.find({uploadByUserID:userId}).sort({ createdAt: -1 });
    if(!postsIncludedUserId){
        res.status(400).json({msg:"posts Error",sucess:false});
    }
    res.status(200).json({posts:postsIncludedUserId,sucess:true});
 } catch (error) {
    res.status(500).json({msg:error,sucess:false});
 }
}
module.exports = GetOnlyUserPosts;