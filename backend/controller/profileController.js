const Profile= require('../models/profile');

exports.postProfile=async(req,res,next)=>{
  try{
    const {userName, firstName, lastName}= req.body;

    if(!userName || !firstName || !lastName){
      console.log("all fields required")
      return res.status(400).json({msg:"All fields are required"});
    }
    const newProfile = new Profile({
      userName,
      firstName,
      lastName,
      user:req.userId,
    })
    await newProfile.save();
    res.status(201).json({msg:"Profile created succesfully"});
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"error whilesetting profile"});
  }
}

exports.getProfile= async(req,res,next)=>{
  try{
    const id= req.userId;
    const userProfile = await Profile.findOne({user:id});
    if(!userProfile){
      return res.status(400).json({msg:"Profile not found"})
    }
    res.status(201).json(userProfile);
  }
  catch(err){
    res.status(500).json({msg:"Cannot get profile"});
  }
}

exports.deleteProfile= async(req,res,next)=>{
  try {await Profile.findOneAndDelete({user:req.userId});
  res.status(201).json({msg:"Profile delted successfully"});
  }
  catch(err){
    res.status(500).json({msg:"Profile not delted"});
  }
}

exports.updateProfile= async(req,res,next)=>{
  try{
    const {userName, firstName, lastName}= req.body;
    if(!userName || !firstName || !lastName){
      return res.status(400).status({msg:"All fielsrequired"});
    }
    await Profile.findOneAndUpdate({user: req.userId}, {userName,firstName, lastName}, {new : true});
    res.status(200).json({msg:"Profile updated"});
  }
  catch(err){
    res.status(500).json({msg: "error while updating"});
  }
}