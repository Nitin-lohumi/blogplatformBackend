const Post = require("../model/PostModel");
const user = require("../model/user_model");
const ControlAddRemoveLikes = async (req, res) => {
  try {
    const userId = req.params.id;
    const { postId } = req.body;
    const postmodel = await Post.findById(postId);
    if (!postmodel) {
      return res.status(404).json({ message: "Post not found" });
    }
    const alreadyLiked = postmodel.likes.some(like => like.userId.toString() === userId);

    if (alreadyLiked) {
      await Post.findByIdAndUpdate(postId,
        { $pull: { likes: { userId: userId } } },
        { new: true });
      const updatedPost = await Post.findById(postId);
      updatedPost.totalLikes =updatedPost.likes.length;
      await updatedPost.save();
      return res.status(200).json({
        msg: "You dislike the post",
        totalLikes: updatedPost.totalLikes,
        LikedBy: updatedPost.likes,
        liked: false,
      });
    } else {
      const currentUser = await user.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      postmodel.likes.push({ userId, userName:currentUser.name }); 
      await postmodel.save();
      const updatedPost = await Post.findById(postId);
      updatedPost.totalLikes =updatedPost.likes.length;
      await updatedPost.save();
      return res.status(200).json({
        msg: "You like the post",
        totalLikes: updatedPost.totalLikes,
        LikedBy: updatedPost.likes,
        liked: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error.message, success: false });
  }
};

module.exports = ControlAddRemoveLikes;
