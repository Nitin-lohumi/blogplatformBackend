const express = require('express');
const getpost = express.Router();
const validateBlogPost = require("../middleware/validateBlogPost");
const GetAllposts = require("../controlers/GetAllposts");
const ControlAddRemoveLikes = require("../controlers/ControlAddRemoveLikes");
const getThisUser = require("../controlers/getThisUser");
const validateOnlyUserPost = require("../middleware/validateOnlyUserPost");
const GetOnlyUserPosts = require("../controlers/GetOnlyUserPosts");
const controlComments = require("../controlers/controlComments");
const verifyUser = require("../middleware/ValidateJWT")
getpost.get("/BlogPosts/:id", verifyUser, validateBlogPost, GetAllposts);
getpost.get("/userProfile/:id", verifyUser, getThisUser);
getpost.post("/BlogPost/like/:id", verifyUser, validateBlogPost, ControlAddRemoveLikes);
getpost.post("/BlogPost/comment/:id", verifyUser, validateBlogPost, controlComments.controlComments);
getpost.get("/BlogPost/showcomments/:postId", verifyUser, validateBlogPost, controlComments.showcomments);
getpost.post("/BlogPost/commentDelete/:id", verifyUser, validateBlogPost, controlComments.deleteComment);
getpost.get("/OnlyUserPosts/:id", verifyUser, validateOnlyUserPost, GetOnlyUserPosts);
module.exports = getpost;