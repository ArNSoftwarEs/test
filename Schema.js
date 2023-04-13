const mongoose=require("mongoose");

const postapp=new mongoose.Schema({
  post:{
    type:String,
    required:true
    
  }
});

const model=mongoose.model("Posts",postapp);

module.exports=model;