import mongoose from "mongoose";
import Post from "../models/Post.js";

// CREATE POST
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post({
    ...post,
    creatorId: req.userId,
    createdAt: new Date().toString(),
  });

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL POSTS
export const getAllPosts = async (req, res) => {
  const { page } = req.query;

  try {
    // Limit Of Posts On Every Pages
    const LIMIT = 6;
    // Start Index Of Every Pages
    const startIndex = (Number(page) - 1) * LIMIT;

    const totalPosts = await Post.countDocuments({});

    const posts = await Post.find({})
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      posts,
      numberOfPages: Math.ceil(totalPosts / LIMIT),
      page: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET POSTS BY SEARCH
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  const title = new RegExp(searchQuery, "i");
  try {
    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE POST BY ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE POST
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const updatePost = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json({ message: "No post with that ID" });

  try {
    const updatedPost = await Post.findByIdAndUpdate(_id, updatePost, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE POST
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ message: "No post with that ID." });
  }

  try {
    await Post.findByIdAndDelete(_id);
    res.status(200).json({
      message: `Post deleted successfully with ID: ${_id}`,
      data: _id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE POST
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).json({ message: "no post with that ID." });

  try {
    const post = await Post.findById(_id);
    // const alreadyLiked = post.likes.findIndex(
    //   (userId) => userId === String(req.userId)
    // );

    // if (alreadyLiked === -1) {
    //   post.likes.push(req.userId);
    // } else {
    //   post.likes = post.likes.filter((userId) => userId !== req.userId);
    // }

    post.likes.includes(req.userId)
      ? (post.likes = post.likes.filter((userId) => userId !== req.userId))
      : post.likes.push(req.userId);

    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
