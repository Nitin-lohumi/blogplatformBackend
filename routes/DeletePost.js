const express = require('express');
const DeleteRoute = express.Router();
const handleDeletePost = require("../controlers/handleDeletePost");
const verifyUser = require("../middleware/ValidateJWT");
DeleteRoute.delete("/postId/:id", verifyUser, handleDeletePost);
module.exports = DeleteRoute;