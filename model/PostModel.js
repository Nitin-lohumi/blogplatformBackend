const mongoose = require("mongoose");
const CreatePostSchema = new mongoose.Schema(
  {
    uploadByUserID: { type: String, required: true },
    posts_UserName: { type: String, require: true },
    profile_picture: { type: String, require: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    publicId: { type: String, required: true },
    likes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userName: { type: String },
        _id: false,
      },
    ],
    isliked: { type: Boolean, required: false },
    totalLikes: { type: Number, require: false },
    comments: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        userName: { type: String },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      },
    ],
  },
  { timestamps: true }
);

const CreatePost = mongoose.model("Post", CreatePostSchema);
module.exports = CreatePost;
