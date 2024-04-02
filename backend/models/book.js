const mongoose=require('mongoose');




const Book=mongoose.model('Book',{
    name:{
     type:String,
     require:true,
     unique:true
    },
    description:{
     type:String,
     require:true
    },
    date:{
     type:String,
     require:true
    }
 });
 

module.exports=Book;