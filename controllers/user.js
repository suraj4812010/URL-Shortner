const user = require("../models/user")
const { v4: uuidv4 } = require('uuid');
const {setUser} = require("../service/Auth")

exports.userSignup = async (req,res) => {
    
    // get data
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.render("signup", {
            msg : "All fields must required"
        })
    }

    // validate if email already exist or not
    const userExist = await user.findOne({email});
    if(userExist){
        return res.render("signup",{
            msg : "User Already Exist"
        } 
        ); 
    }

    await user.create({name,email,password});

    return res.redirect("/");  
}




exports.userLogin = async (req,res) => {
    const {email, password} = req.body;

    const userExist = await user.findOne({email, password});
    // console.log(userExist);
    if(!userExist){
        return res.render("login",{
            error: "Invalid email or password!",
        });
    }

    
    // store this uuid with user
    const token =  setUser(userExist);
    const option = {
        httpOnly :true,
        expires : new Date(Date.now() + 5*60*1000),
        secure :true,
        
    }
    res.cookie("token", token , option );

    return res.redirect("/"); 
}   


exports.userLogout = async (req,res) => {

    try{
        const user = req.user;
         if(!user || user == undefined){
            
            return res.render("home",{
            logoutMsg : "Logout failed"
        })
        }
        res.clearCookie("token")
        
        return res.redirect("/login");
    }
    catch(error){
        console.log(error)
        return res.render("home")
    }
}