import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { ConnectToDB } from './config/connectToDB.js';
import adminRouter from './routes/adminRoutes.js';
import blogRoute from './routes/blogRoutes.js';

const app = express();

//VARIABLES
<<<<<<< HEAD
const PORT = process.env.PORT || 5000;

// Sanitize FRONTEND_URL (trim and remove stray quotes) to avoid accidental CORS mismatches
const FRONTEND_URL = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/^'+|'+$/g, '').trim() : undefined;
=======
const PORT = process.env.PORT
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6

//----------------------------------------------------------

//MIDDLEWARES
app.use(cors({
<<<<<<< HEAD
  origin: process.env.NODE_ENV === 'production' ? FRONTEND_URL : true,
=======
  origin: process.env.FRONTEND_URL,
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
  credentials: true 
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));


//----------------------------------------------------------


//ROUTES
app.get('/' , (req,res)=>{
    res.send("API WORKING")
})

app.use('/api/admin' , adminRouter)
app.use('/api/blog' , blogRoute)

//----------------------------------------------------------



//Start
ConnectToDB()
.then(()=>{
    app.listen(PORT , ()=>{
<<<<<<< HEAD
        console.log(`Server Started on port ${PORT}`)
    })
})
.catch((err)=>{
    console.error("Something Went Wrong while starting the server:", err.message)
=======
        console.log("Server Started")
    })
})
.catch((err)=>{
    console.log("Something Went Wrong")
>>>>>>> 99fb45abda0df70ee507f809d114273565534de6
})

//----------------------------------------------------------