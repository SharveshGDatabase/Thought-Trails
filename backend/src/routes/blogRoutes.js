import express from 'express'
import { addBlog, addComments, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import authMiddleware from '../middleswares/authMiddleware.js';

const blogRoute = express.Router();


blogRoute.post('/add',addBlog)

blogRoute.get("/all" , getAllBlogs);

blogRoute.get('/:blogId' , getBlogById);

blogRoute.post('/delete' , deleteBlogById);

blogRoute.post('/toggle-publish',togglePublish);

blogRoute.post('/add-comment' , addComments);

blogRoute.post('/comments' , getBlogComments);

blogRoute.post('/generate' , generateContent)
export default blogRoute;