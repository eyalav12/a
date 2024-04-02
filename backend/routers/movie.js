const express=require('express');
const router=new express.Router();
const Movie=require('../models/movie');

// const cors = require('cors');
// router.use(cors());

// const corsOptions = {
//     origin: 'http://localhost:3000', 
//     optionsSuccessStatus: 200 
//   };
  
// router.use(cors(corsOptions));

router.post('/search/movies',async(req,res)=>{
    try{
        const{query}=req.body;
        const movie =await Movie.findOne({name:query});
        res.json(movie);
        console.log(movie);

    }
    catch(e){
        console.log("baddddddddd");
        console.error("error in searching",e);
        res.status(500).send();
    }
});


router.post('/movies',(req,res)=>{
    const mov=new Movie(req.body);
    mov.save().then(()=>{
        res.send(mov);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

router.get('/movies',(req,res)=>{
    Movie.find({}).then((movies)=>{
        res.send(movies);
    }).catch((error)=>{
        console.log(error);
    });
});


router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(400).send();
        }
        res.send(movie);
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).send("Internal server error");
    }
});

router.get('/movies/:id',(req,res)=>{
    const _id=req.params.id;
    Movie.findById(_id).then((movie)=>{
        if(!movie){
            return res.status(404).send();
        }
        res.send(movie);
    }).catch((e)=>{
        res.status(500).send(e);
    });
});

router.patch('/movies/:id',async(req,res)=>{
    try{
        const movie=await Movie.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!movie){
            return res.status(404).send();
        }
        res.send(movie);
    }
    catch(error){
        return res.status(400).send(error);
    }
});






module.exports=router;