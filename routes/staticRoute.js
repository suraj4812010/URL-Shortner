const express = require("express");
const router = express.Router();
const URL = require("../models/url")
const user = require("../models/user")

//static routes for rendering all the urls to home page
router.get('/', async (req,res) => {
    
    // if no user found login first
    if(!req.user) return res.redirect("/login"); 
    
    // get  urls from DB for the logged in user
    const allUrls = await URL.find({createdBy : req.user._id});
    
    // render all the urls in the home page and pass the all urls to the home page
    return res.render("home",{
    urls:allUrls,
    name:req.user.name,
   })
})


//static routes for rendering signup page
router.get("/signup", (req,res) => {
    return res.render("signup")
})

//static routes for rendering login page
router.get("/login", (req,res) => {
    return res.render("login")
})

module.exports = router;