const User=require("../models/user")
const bcrypt = require("bcrypt");
var validator = require("email-validator");
 const jwt= require('jsonwebtoken');
const user = require("../models/user");


exports.registerUser = async (req, res) => {
  const { email, username, password ,phonenumber } = req.body;
  const hashPw = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    
    username,
    password: hashPw,
    phonenumber:`+251${phonenumber.slice(-9)}`,
  });
  try {
    const oldUser = await User.findOne({
      username: username,
    });
    if (oldUser) {
      res.status(400).json({message: "already registered"});
      return;
    }
    const result = await newUser.save();
    res.status(200).json({ newUser: result });
  } catch (err) {
    res.status(500).json({error: err});
  }
};

exports.login = async (req, res) => {

  try {
    //console.log('inside login');
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({message: "user not found"});
    }
    const validatePw = await bcrypt.compare(password, user.password);
    if (!validatePw) {
      res.status(400).json("wrong credential");
      return;
    }
  //   if(password!=user.password)
  //  {
  //    return res.status(400).json({message: "wrong credential"});
  //  }
  
    res.status(200).json({user: user});
  } catch (err) {
    res.status(400).json({message: "something failed"});
  }
};


exports.forgot = async(req,res)=>{
  const JWT_SECRET=process.env.JWT_SECRET;
  
  try {
  
    const { email  } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({message: "user not found"});
    }
    
    console.log(user.id)
const secret =JWT_SECRET + user.password
const payload= {
  email:user.email,
  id:user._id
}
const token = jwt.sign(payload,secret,{expiresIn:'15m'})
console.log(token);
res.status(200).json({ user, token });
//  const link= `http://localhost:5026/reset/${user._id}/${token}`;
  }
  catch (err) {
    res.status(400).json({message: "something failed"});
  }
};
exports.reset= async (req,res)=>{
  const newPw = '123456'
  const JWT_SECRET=process.env.JWT_SECRET;
const {id,token}=req.params; 
const user = await User.findById(id);
console.log(req.params);
if(!user){
  return res.status(400).json({message: "user not exist "});
}

const secret =JWT_SECRET + user.password
try{
  const verify= jwt.verify(token,secret )
  console.log(verify)
 return  res.status(200).json({email: user.email});
  
}
catch (err) {
  res.status(400).json({message: "not verified"});  
}

}
exports.resetpd= async (req,res)=>{
  const JWT_SECRET=process.env.JWT_SECRET;
const {id,token}=req.params; 
const {password}=req.body;
const user = await User.findById(id);

if(!user){
  return res.status(400).json({message: "user not exist "});
}

const secret =JWT_SECRET + user.password
try{
  const verify= jwt.verify(token,secret )
  const hashPw = await bcrypt.hash(password, 10);
  await User.updateOne({
    _id:id
  },
  {
    $set:{
      password:hashPw
    }
  })
  
return  res.status(200).json({message:"password updated "});
  
}
catch (err) {
  res.status(400).json({message: "something went wrong "});  
}

}