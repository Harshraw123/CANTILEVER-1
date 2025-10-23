import express from 'express';
import authMiddleware from '../middleware/auth.js';

import { createBlog, deleteBlog, getAllBlogs, getBlogByBlogId, getBlogByBlogIdForEdit, getMyBlogs, toggleLike, updateBlog } from '../controllers/BlogController.js';

const BlogRouter = express.Router();

// Route to get all tasks or create a new task
BlogRouter.route('/gc')
  .get(authMiddleware, getMyBlogs)
  .post(authMiddleware, createBlog);


 BlogRouter.route('/all')
  .get(getAllBlogs)


  BlogRouter.route('/:id/like').put(authMiddleware,toggleLike)


// Route to get a specific blog by ID (public access for published blogs)
BlogRouter.route('/:id')
  .get(getBlogByBlogId);

// Route to get, update, or delete a specific task by ID (for editing)
BlogRouter.route('/:id/gp')
  .get(authMiddleware, getBlogByBlogIdForEdit)
  .put(authMiddleware, updateBlog)
  .delete(authMiddleware,deleteBlog);


export default BlogRouter;
