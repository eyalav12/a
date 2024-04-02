const mongoose=require('mongoose');



const Movie=mongoose.model('Movie',{
    name:{
        type:String,
        require:true,
        unique:true
    },
    overview:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    }
});


module.exports=Movie;