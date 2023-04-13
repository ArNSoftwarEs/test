const express = require("express");
const app = express();
const port = 7000;
const po = require("./models/Schema");
const mongoose = require("mongoose");
const db = mongoose.connect(
  "mongodb+srv://BlogApp:NR2eLF2lEftMDfCB@cluster0.u2yilal.mongodb.net/?retryWrites=true&w=majority",
  (req, res) => {
    console.log("DB connected");
  }
);
module.exports = db;

const Bodyparser = require("body-parser");
app.use(Bodyparser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

app.listen(port, (req, res) => {
  console.log(`App started at ${port}`);
 
});

//create TaskItem
app.post("/create-post", (req, res) => {
  po.create(
    {
      post: req.body.additem,
    },
    (err, task) => {
      if (err) {
        console.log("Error in creating task");
      } else {
        res.redirect("/");
      }
    }
  );
});

//render task
app.get("/", (req, res) => {
  po.find({}, (err, task) => {
    if (err) {
      console.log(err);
    } else {
      res.render("task", {
        TaskItem: task,
      });
    }
  });
});

//deleteTask
app.post("/delete/:id",(req,res)=>{
  po.findByIdAndDelete({_id:req.params.id},req.body,(err,docs)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect("/")
    }
  })
})
