const User = require("../model/user_model");
const validateOnlyUserPost =async(req,res,next)=>{
  try {
    const UserId = req.params.id;
    const user = await User.find({_id:UserId});
    if(!user){
        res.status(404).json({msg:"not found user ",sucess:false});
    }
    req.userId = UserId;
    next();
  } catch (error) {
    res.status(500).json({msg:error,sucess:false});
  }
}
module.exports = validateOnlyUserPost;