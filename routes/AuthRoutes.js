const express = require('express');
const passport = require('passport');
const auth = require('../controlers/authControllers');
const router = express.Router();
const validateSignUp = require('../middleware/IsSignUp');
const SignUp = require("../controlers/SignUp");
const validateManualLogin = require('../middleware/IsLoginUser');
const ManualLogin = require("../controlers/ManualLogincontroller");

router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google',{
    successRedirect:"http://localhost:5173/",
    failureRedirect:"http://localhost:5173/auth/login"
  })
);
router.get('/ShowUser', auth.loginSuccess);  

router.post('/signup',validateSignUp,SignUp);

router.post("/ManualLogin",validateManualLogin,ManualLogin);

router.get('/logout', auth.logout);

module.exports = router;
