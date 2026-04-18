import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    addBlog(state, action) {
      state.blogs.push(action.payload);
    },

    updatedBlog(state, action) {
      state.blogs = state.blogs.map((blog) =>
        blog.$id === action.payload.$id ? { ...blog, ...action.payload } : blog,
      );
    },

    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((blog) => blog.$id !== action.payload);
    },
  },
});

export const {
  setBlogs,
  setLoading,
  setError,
  addBlog,
  updatedBlog,
  deleteBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
