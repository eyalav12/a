const express=require('express');
const router=new express.Router();
const mongoose=require('mongoose');
const movieRouter=require('./routers/movie');
const bookRouter=require('./routers/book');
const cors = require('cors');

const app=express();
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(movieRouter);
app.use(bookRouter);
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to db");
    app.listen(8000,()=>{
        console.log("serever is running on port 8000");
    });
}).catch((e)=>{
    console.log("failed",e);
});






