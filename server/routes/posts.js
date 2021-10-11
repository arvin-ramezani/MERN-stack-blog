import express from "express";
import {
  createPost,
  getAllPosts,
  updatePost,
  likePost,
  deletePost,
  getPostById,
  getPostsBySearch,
} from "../controllers/posts.js";

// Athentication middleware
import auth from "../middleWares/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/srch", getPostsBySearch);
router.get("/:postId", getPostById);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.patch("/:id/likes", auth, likePost);
router.delete("/:id", auth, deletePost);

export default router;
