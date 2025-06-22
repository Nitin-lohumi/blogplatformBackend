const User= require('../model/user_model');
const bycrypt = require('bcryptjs');
const SignUp =async(req,res)=>{
  try {
    const {name,email,password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(409).json({msg:"this Email is already in signIn",status:false});
    }
    const usermodel = new User({name,email,password});
    usermodel.password = await bycrypt.hash(password,10);
    await usermodel.save();
    res.status(209).json({msg:"sucessfull",status:true});
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message: "internal server error",
        status: false,
      });
  }
}
module.exports = SignUp;