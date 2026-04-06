const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const User= require("../models/user");
const user = require('../models/user');


exports.postLogin=async (req,res,next)=>{
  try{
    const {email,password}=req.body;
    if(!email && !password){
      return res.status(400).json({msg:"Both email and Password is required"})
    }else if(!email){
      return res.status(400).json({mag:"Email is required"});
    }else if(!password){
      return res.status(400).json({msg:"Password is required"});
    }
    
    const user= await User.findOne({email});
    if(!user){
      return res.status(400).json({msg: "Invalid email"});
    }

    const Match= await bcrypt.compare(password,user.password);

    if(!Match){
      return res.status(400).json({msg:"Incorrect password"});
    }

    const token = jwt.sign(
      {userId:user._id},
      process.env.JWT_KEY,
      { expiresIn: "1d"}
    );

    res.json({token});
  }
  catch(Err){console.log(Err)}
}


exports.postSignup= async(req,res,next)=>{
  try {
    const {email, password}=req.body;

    if(!email && !password){
      return res.status(400).json({msg:"Both email and Password is required"})
    }else if(!email){
      return res.status(400).json({mag:"Email is required"});
    }else if(!password){
      return res.status(400).json({msg:"Password is required"});
    }

    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      return res.status(400).json({msg: "Invalid email format"});
    }

    if(!email.endsWith("@gmail.com")){
      return res.status(400).json({msg:"Enter a valid email"})
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({msg:"User already exists, Please check your email"});
    }

    const hashedPass= await bcrypt.hash(password,10);

    const user = new User({email,password:hashedPass});

    await user.save();

    res.status(201).json({
      msg:"user created succesfully"
    })
  }
  catch(err){
    console.log(err);
  }
}
