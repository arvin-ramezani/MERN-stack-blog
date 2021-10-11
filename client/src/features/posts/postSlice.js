import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostsBySearch,
  getSinglePost,
  likePost,
} from "../../api-2/posts";

const initialState = {
  posts: [],
  status: "idle",
  currentPostId: null,
  currentPage: null,
  numberOfPages: null,
};

// CREATE POST
export const createPostAsync = createAsyncThunk(
  "posts/createPost",
  async (post) => {
    const response = await createPost(post);

    return response.data;
  }
);

// FETCH ALL POSTS
export const getAllPostsAsync = createAsyncThunk(
  "posts/getAllPosts",
  async ({ page, history }) => {
    const response = await getAllPosts(page);
    history.push(`/posts?page=${page}`);

    return response.data;
  }
);

// FETCH SINGLE POST BY ID
export const getSinglePostByIdAsync = createAsyncThunk(
  "posts/getSinglePostById",
  async (post) => {
    const response = await getSinglePost(post.id);
    post.history.push(`/posts/${post.id}`);

    return response.data;
  }
);

// FETCH POSTS BY SEARCH
export const getPostsBySearchAsync = createAsyncThunk(
  "posts/getPostsBySearch",
  async ({ history, title, tags }) => {
    console.log(history, title, tags);
    const response = await getPostsBySearch({ title, tags });

    history.push(`/posts/srch?searchQuery=${title || "none"}&tags=${tags}`);

    return response.data;
  }
);

// EDIT POST
export const editPostAsync = createAsyncThunk(
  "posts/editPost",
  async (updatePost) => {
    const response = await editPost(updatePost);

    return response.data;
  }
);

// DELETE POST
export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async (id) => {
    const response = await deletePost(id);

    return response.data;
  }
);

// LIKE POST
export const likePostAsync = createAsyncThunk("posts/likePost", async (id) => {
  const response = await likePost(id);

  return response.data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setCurrentPostId: (state, { payload }) => {
      state.currentPostId = payload;
    },
  },
  extraReducers: {
    [createPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [createPostAsync.fulfilled]: (state, { payload }) => {
      state.status = "idle";
      state.posts.push(payload);
    },

    [getAllPostsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getAllPostsAsync.fulfilled]: (state, { payload }) => {
      state.status = "idle";
      state.posts = payload.posts;
      state.numberOfPages = payload.numberOfPages;
      state.currentPage = payload.page;
    },

    [getSinglePostByIdAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getSinglePostByIdAsync.fulfilled]: (state, { payload }) => {
      state.status = "idle";
      state.post = payload;
    },

    [editPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editPostAsync.fulfilled]: (state, { payload }) => {
      state.status = "idle";
      state.posts = state.posts.map((post) =>
        post._id === payload._id ? payload : post
      );
      state.currentPostId = null;
    },

    [deletePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePostAsync.fulfilled]: (state, { payload }) => {
      state.status = "idle";
      state.posts = state.posts.filter((post) => {
        return post._id !== payload.data;
      });
    },

    [getPostsBySearchAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsBySearchAsync.fulfilled]: (state, { payload }) => {
      state.status = "idle";
      state.posts = payload;
    },
  },
});

export const { setCurrentPostId } = postsSlice.actions;

// useSelector FOR ALL POSTS
export const allPostsSelector = (state) => state.posts.posts;

// useSelector For CurrentPage
export const currentPageSelector = (state) => state.posts.currentPage;

// useSelector For CurrentPage
export const totalNumberPagesSelector = (state) => state.posts.numberOfPages;

// useSelector For Single PostDetails
export const postDetailsSelector = (state) => state.posts.post;

// useSelector FOR POSTS STATE STATUS
export const stateStatus = (state) => state.posts.status;

export default postsSlice.reducer;
