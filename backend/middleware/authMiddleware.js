const  jwt = require("jsonwebtoken");
const User =  require("../models/usermodel");
const expressAsyncHandler = require("express-async-handler");

const protect = expressAsyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            console.log(token);
            const decoded = jwt.verify(token,"raghav_secret");

            console.log(decoded);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }catch(err){
            res.status(401);
            throw new Error("Not authorized , token failed");
        }
    }
})

module.exports = {protect};