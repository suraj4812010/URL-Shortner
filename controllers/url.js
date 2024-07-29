const URL = require("../models/url")
const shortid = require("shortid");


// handler to generate shortID
exports.generateShortUrl = async (req,res) => {
    // get the url from the req body
    const {url} = req.body;

    // validate if url is present or not
    if(!url){
        return res.render("notFound");
    }

    // generate short id
    const shortID = shortid(4);

    // create entry in DB
      await  URL.create({
        shortId :shortID,
        redirectUrl : url,
        visitHistory: [],
        createdBy : req.user._id,
     })

    // render the home page and pass shortID
     return res.render("home", {
        id:shortID
     })

    //  return res.status(200).json({
    //     id:shortID,
    //     msg:"Short id generated successfully"
    //  })
}



// handler to redirect the shortId to original URL
exports.redirectToUrl = async (req,res)=>{
    // get short id from url params
    const shortId = req.params.shortId;

    // update in DB 
    const entry = await URL.findOneAndUpdate({shortId} , {
        $push: {
            visitHistory:{
                timestamp : Date.now()
            } 
        }
    });

    // redirect to the url for the matched shortId
    res.redirect(entry.redirectUrl)
}



// handler to get analytics of the URL
exports.getAnalytics = async (req,res) => {
    // get short id from url params
    const shortId = req.params.shortId;

    // find the data from the DB for the given shortId
    const result = await URL.findOne({shortId});

    return res.status(200).json({
        totalClicks : result.visitHistory.length,
        analytics: result.visitHistory
    })
}