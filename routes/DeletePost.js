const express = require('express');
const DeleteRoute = express.Router();
const handleDeletePost = require("../controlers/handleDeletePost");
DeleteRoute.delete("/postId/:id",handleDeletePost);
module.exports = DeleteRoute;