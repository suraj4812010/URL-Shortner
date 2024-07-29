const {getUser} = require("../service/Auth")



// iske baad url route chalega for the loggedin user only
async function restrictToLoggedInUser(req,res,next)  {
    
    const token = req.cookies.token;

    // if cookie / uid nhi hai iska matlab user loggedin nhi hai and redirect him to login
    if(!token) return res.redirect("/login");

    // get the user using the token for logedin user
    const user = getUser(token);
    // console.log(user);

    if(!user) return res.redirect("/login");

    req.user = user;
    next();

}

// checkAuth ke baad static route chalega for this logged in user
async function checkAuth (req,res,next){
    const token = req.cookies.token;

    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUser, checkAuth};