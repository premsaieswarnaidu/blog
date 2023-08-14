//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));
async function main(){
  await mongoose.connect('mongodb+srv://admin_sai:Prem1601@cluster0.a72dc1s.mongodb.net/blogDB');
  const matterSchema = new mongoose.Schema({
    title: String,
    content: String
  });

  const Post = mongoose.model("post",matterSchema);


app.get("/",function(req,res){
  Post.find()
  .then(function(postList){
    res.render("home.ejs",{pp:homeStartingContent,posts1:postList});
  })
  .catch(function(err){
    console.log(err)
  });
});
app.get("/about",function(req,res){
  res.render("about.ejs",{pp1:aboutContent});
});
app.get("/contact",function(req,res){
  res.render("contact.ejs",{pp2:contactContent});
});
app.get("/compose",function(req,res){
  res.render("compose.ejs");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title:req.body.textTitle,
    content:req.body.textBody
  });
  post.save();

  //posts.push(post);
  res.redirect("/")
});

app.get("/posts/:name",function(req,res){
  var cnt=0;
  Post.find()
  .then(function(fList){
    fList.forEach(function(ele){
      if(ele._id==req.params.name){
        res.render("post.ejs",{title:ele.title,content:ele.content})
        cnt=1;
      }
    });
    if(cnt==0){
      console.log("match not found");
    }
  })
  .catch(function(err){
    console.log(err);
  });
});

}


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
