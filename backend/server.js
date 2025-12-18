import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { ConnectToDB } from './src/config/connectToDB.js';
import adminRouter from './src/routes/adminRoutes.js';
import blogRoute from './src/routes/blogRoutes.js';

const app = express();

//----------------------------------------------------------
// VARIABLES
const PORT = process.env.PORT || 5000;

// Sanitize FRONTEND_URL (trim and remove stray quotes) to avoid accidental CORS mismatches
const FRONTEND_URL = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/^'+|'+$/g, '').trim() : undefined;

//----------------------------------------------------------
// MIDDLEWARES
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? FRONTEND_URL : true,
  credentials: true 
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

//----------------------------------------------------------
// ROUTES
app.get('/', (req, res) => {
    res.send("API WORKING")
});

app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRoute);

//----------------------------------------------------------
// START SERVER
ConnectToDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server Started on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Something Went Wrong while starting the server:", err.message);
});

//----------------------------------------------------------
