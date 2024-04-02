const express=require('express');
const router=new express.Router();
const Book = require('../models/book');

const cors = require('cors');
router.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200 
  };
  
router.use(cors(corsOptions));


router.post('/search/books',async(req,res)=>{
    try{
        const{query}=req.body;
        const book =await Book.findOne({name:query});
        res.json(book);
        console.log(book);

    }
    catch(e){
        console.log("baddddddddd");
        console.error("error in searching",e);
        res.status(500).send();
    }
})


router.post('/books', (req, res) => {
    console.log('Received request body:', req.body); // Log the request body

    const book = new Book(req.body);
    book.save()
        .then(() => {
            res.send(book);
        })
        .catch((e) => {
            console.error('Error saving book:', e); 
            res.status(400).send(e);
        });
});


router.get('/books',(req,res)=>{
    Book.find({}).then((books)=>{
        res.send(books);
    }).catch((e)=>{
        consloe.log(e);
    });
});


router.delete('/books/:id',async(req,res)=>{
    const book=await Book.findByIdAndDelete(req.params.id);
    if(!book){
        res.status(400).send();
    }
    res.send(book);
});

router.patch('/books/:id',async(req,res)=>{
    try{
        const book=await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!book){
            return res.status(404).send();
        }
        res.send(book);
    }
    catch(error){
        return res.status(400).send(error);
    }
});

module.exports=router;