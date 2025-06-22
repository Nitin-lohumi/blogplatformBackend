const User = require("../model/user_model");
const getThisUser =async(req,res)=>{
     try {
        const postId =req.params.id;
        const user = await User.findOne({_id:postId});
        res.status(200).json({data:user});
     } catch (error) {
        console.log(error);
     }
}
module.exports = getThisUser;