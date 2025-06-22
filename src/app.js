require('dotenv').config();
require('../config/config_passport');
const express = require('express');
const app = express();
require('../DB_connection/DB_connection');
const cors = require('cors');
const session = require('express-session');
const router = require('../routes/AuthRoutes');
const passport = require('passport');
const path = require("path");
const files = require("../routes/UpLoadFiles");
const getpost = require("../routes/PostRoutes");
const DeleteRoute =require("../routes/DeletePost");
app.use('../ProfileImage', express.static(path.join(__dirname, '../ProfileImage')));
app.use(cors({
  origin:"http://localhost:5173",
  methods:"GET,POST,PUT,DELETE",
  credentials: true,
})
);
app.use(session({
  secret:"hcuiasgdcv12h321g2e91",
  resave:false,
  saveUninitialized:true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, 
    sameSite: 'lax',
    httpOnly: true,
    secure: false, 
  },
}));

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: '50mb' }));

app.use('/auth',router);
app.use('/upload',files);
app.use('/posts',getpost);
app.use('/delete',DeleteRoute);

app.get('/',(req,res)=>{
  res.send("helllo world");
});

app.listen(process.env.PORT,()=>{
  console.log("listing at port number ",process.env.PORT);
})