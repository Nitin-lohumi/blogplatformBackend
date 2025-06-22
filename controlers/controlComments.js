const Post = require("../model/PostModel");
const User = require("../model/user_model");

const controlComments = async (req, res) => {
  try {
    const userId = req.params.id;
    const { postId, text } = req.body;
    if (!userId || !postId || !text) {
      return res
        .status(400)
        .json({ msg: "User ID, Post ID, and comment text are required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const newComment = {
      userId,
      userName: user.name,
      text,
    };
    post.comments.push(newComment);
    await post.save();
    res.status(200).json({
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

const showcomments =async(req,res)=>{
   try {
    const {postId} = req.params;
    const getPost = await Post.findById(postId);
    res.status(200).json({post:getPost });
   } catch (error) {
    res.status(500).json({ msg: "Internal server error", error });
   }
}

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    // const userid = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // if (post.uploadByUserID != userid) {
    //   return res.status(404).json({ msg: "this is not postHolder User" });
    // }
    const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    post.comments.splice(commentIndex, 1);
    await post.save();
    res.status(200).json({ msg: "Comment deleted successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = { controlComments, deleteComment,showcomments };
