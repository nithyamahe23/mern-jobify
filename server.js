import 'express-async-errors';

import * as dotenv from 'dotenv';


//invoke it
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
//import { validateTest } from './middleware/validationMiddleware.js';
import cookieParser from 'cookie-parser';

//routes
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

//public folder
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//import middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import { dir } from 'console';
import cloudinary from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

//create the local array
let jobs = [
    {id:nanoid(), company:"google", position:"frontend"},
    {id:nanoid(), company:"apple", position:"backend"}
];

//create __dirname - We are doing this because we are using ES6
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

//app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './client/dist')));

//set up the middleware - applied to all the routes
app.use(cookieParser());
app.use(express.json());

app.get('/', (req,res) => {
    res.send("Hello World!");
});

// //Test route for testing express validator
// app.post('/api/v1/test', 
//     validateTest,
//     (req, res) => {
//     const {name} = req.body;
//     res.json({message:`Hello ${name}`});
// })
// app.post("/", (req, res) => {
//     console.log(req);
//     res.json({message:"Data Received", data:req.body})
// })

// //GET ALL JOBS
// app.get('/api/v1/jobs', );

// //CREATE A JOB
// app.post('/api/v1/jobs', );

// //GET SINGLE JOB
// app.get('/api/v1/jobs/:id', );

// //EDIT JOB
// app.patch('/api/v1/jobs/:id', );

// //DELETE JOB

// app.delete('/api/v1/jobs/:id', );

//test route
app.get('/api/v1/test', (req, res) => {
    return res.json({msg : 'test route'});
})

//Map the URL and router going to handle it
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

//set path to index.html
app.get('*', (req, res) => {
    //res.sendFile(path.resolve(__dirname, './public', 'index.html'));
    res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
})

//Not found Error
app.use('*', (req, res) => {
    res.status(404).json({msg:' Resource Not Found'});
});

//Error middleware- it should be the last method. No URL is provided.
//Controller will have 4 parameters
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;  //if value does not exist in dot env use the hasdcoded value 
// app.listen(5100, () => {
//     console.log("server is running");
    
// });


//connect to the database and then start the server
try{
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server is running on PORT ${port}`);
        
    });
}catch(error){
    console.log(error);
    process.exit(1);    //1 means error
}
