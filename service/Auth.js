const jwt = require("jsonwebtoken")

// create a token and return token
function setUser(user) {
   const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
    }

   // return token
   return jwt.sign(payload, process.env.SECRET_KEY)
}


// verify token and return user
function getUser(token) {
    if(!token) return null;
    try{
        return jwt.verify(token, process.env.SECRET_KEY)
    }
    catch(error){
        console.log(error);
        return null;
    }

}

module.exports = {
    setUser,getUser
}