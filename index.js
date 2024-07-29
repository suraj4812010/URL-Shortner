const express = require("express")
const URL = require("./models/url")
const path = require("path")
const cookieParser = require("cookie-parser")
const {restrictToLoggedInUser, checkAuth} = require("./middlewares/Auth")

const app = express();

//  middleware
app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cookieParser());


// set view engine for server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views") )


// app.get("/test", async (req,res) => {
//     const allUrls = await URL.find({});
//    return res.render("home" , {
//         urls:allUrls
//    })
// })


// to use this route first user have to log in
const urlRoute = require("./routes/url")
app.use('/url', restrictToLoggedInUser, urlRoute);

// route for staticRoute
const staticRoute = require("./routes/staticRoute")
app.use('/',checkAuth, staticRoute);

// route for login and signup
const userRoute = require("./routes/user")
app.use('/user',userRoute);


const PORT = 3000;

// database connection
const connectToDB = require("./config/databse");
connectToDB();

app.listen(PORT, ()=> {
    console.log(`Server started at PORT ${PORT}`);
})