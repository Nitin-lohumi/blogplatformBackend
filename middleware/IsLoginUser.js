const joi=  require("joi");

const validateManualLogin = (req,res,next)=>{
    const Loginschema  = joi.object({
        email:joi.string().required(),
        password:joi.string().required()
    });
    const {error} = Loginschema.validate(req.body);
    if(error){
        return res.status(409).json({msg:"filed is not validate",status:false});
    }
    next();
}
module.exports = validateManualLogin;