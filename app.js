const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

const homeContent = "This is the home page. Welcome to 'Blog Website'.";
const aboutContent = "This is the about us page.";
const contactContent = "This is the contact page.";
const postList = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("home", {
        homeText: homeContent, 
        posts: postList
    });
});

app.get("/about", function(req,res){
    res.render("about", {aboutText: aboutContent});    
});

app.get("/contact", function(req,res){
    res.render("contact", {contactText: contactContent});    
});

app.get("/compose", function(req,res){
    res.render("compose");    
});

app.post("/compose",function(req,res){
    const post = {
        title: req.body.title,
        content: req.body.content
    };
    postList.push(post);

    res.redirect("/");
});

app.get("/post/:postName", function(req,res){

    const paramsName = req.params.postName;
    postList.forEach((element) => {
    
        const postName = element.title;
        if(_.lowerCase(paramsName) === _.lowerCase(postName)) {
            res.render("post", {
                postTitle: element.title, 
                postContent: element.content
            });
        };
    });

});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});