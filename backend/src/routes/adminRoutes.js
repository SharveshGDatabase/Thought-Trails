import express from 'express'
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard, getDBStats, seedDatabase } from '../controllers/adminController.js'
import authMiddleware from '../middleswares/authMiddleware.js';

const adminRouter = express.Router()

adminRouter.post("/login" , adminLogin);

adminRouter.get('/comments' , authMiddleware , getAllComments);

adminRouter.get('/blogs' , authMiddleware , getAllBlogsAdmin);

adminRouter.post('/delete-comment' , authMiddleware , deleteCommentById);

adminRouter.post('/approve-comment',authMiddleware,approveCommentById);

adminRouter.get('/dashboard' , authMiddleware, getDashboard);

// Debug route: returns counts and a recent blog (requires auth)
adminRouter.get('/db-stats', authMiddleware, getDBStats);

// Admin-only: seed database with a sample blog and comment (optional ?force=1 to overwrite)
adminRouter.post('/seed', authMiddleware, seedDatabase);

export default adminRouter;