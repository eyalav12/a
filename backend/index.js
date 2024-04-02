const express=require('express');
const router=new express.Router();
const mongoose=require('mongoose');
const movieRouter=require('./routers/movie');
const bookRouter=require('./routers/book');
const Book=require('./models/book');
const Movie = require('./models/movie');
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


mongoose.connect("mongodb+srv://eyalav12:poli12@backenddb.cm3bqvg.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDb")
.then(()=>{
    console.log("connected to db");
    app.listen(8000,()=>{
        console.log("serever is running on port 8000");
    });
}).catch(()=>{
    console.log("failed");
});






