const User = require('../models/usermodel');
const generateToken = require('../config/generateToken');
const asyncHandler = require('express-async-handler')
const registerUser = async ( req,res) => {
    const { name, email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }
    const userExists = await User.findOne({email});
    if(userExists){
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }else{
        res.status(400);
        throw new Error("Failed to create new user");
    }
}
const authUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user&&(await User.matchPassword(password))){
        res.json.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateToken(user._id),
        });
    }else{
        res.status(401);
        throw new Error("Invalid email or password");
    }
});
module.exports = {registerUser,authUser};