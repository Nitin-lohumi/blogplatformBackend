const bycryptjs  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user_model");

const ManualLogin = async(req,res)=>{
    try {
         const {email,password} = req.body;
         const user = await User.findOne({email});
         if(!user){
             return res.status(401).json({msg:"not found user",status:false});
            }
        const decrypt =bycryptjs.compare(password,user.password);
        if(!decrypt){
           return res.status(401).json({msg:"password is not match",status:false});
        }
     // const jwtToken = jwt.sign({email:user.email, _id:user.id, name:user.name},process.env.JWT_SECRET,{expiresIn:"24h"});
        req.session.user = { email: user.email , name: user.name };
        res.status(200).json({msg:"sucess login",status:true, userData:req.session.user });
        user.save();
    } catch (error) {
        return res.status(401).json({msg:" not matches",status:false});
    }
}

module.exports = ManualLogin;