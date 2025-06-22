const Joi = require('joi');

const validateSignUp =(req,res,next)=>{
    const signupScheema = Joi.object({
        name:Joi.string().max(100).min(3).required(),
        email:Joi.string().email().required(),
        password:Joi.string().min(3).max(10).required(),
        picture:Joi.string().optional()
    });
    const { error } = signupScheema.validate(req.body);
    if(error){
        return res.status(400).json({ message: "some thing is missing in validating", error });
    }
    next();
}
  
module.exports = validateSignUp;