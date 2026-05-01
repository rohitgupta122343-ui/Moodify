const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const blacklistModel = require("../models/blacklistingModel");
const redis = require('../config/cache')

const registerController = async(req,res)=>{

    const {username,email,password} = req.body;

    const userExtist = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })
    
    if(userExtist){
        return res.status(200).json({
            message : "user already extist"
        })
    }

    const hashPass = await bcrypt.hash(password,10)

   const user = await userModel.create({
        username,
        email,
        password : hashPass
    })


    const token = jwt.sign({username : user.username,id : user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(201).json({
        message : "user create sucessfully",
       user:{
            username : user.username,
            email : user.email
        }
    })

}

const loginController = async(req,res)=>{

    const {username,email,password} = req.body

    const user = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    }).select('+password')

    if(!user){
        return res.status(404).json({
            message : "user not found"
        })
    }

    const passValid = await bcrypt.compare(password,user.password)

    if(!passValid){
        return res.status(403).json({
            message : "user unauthorized"
        })
    }

    const token = jwt.sign({username:user.username,id:user._id},process.env.JWT_SECRET)

    res.cookie('token',token)

    res.status(200).json({
        message : "user login sucessfully",
        user:{
            username : user.username,
            email : user.email
        }
    })

}

const getMe = async(req,res)=>{
    
const user = await userModel.findById(req.user.id);


if(!user){
    return res.status(404).json({
        message : "user not extist"
    })
}

res.status(200).json({
    user
})

}

const logoutController = async(req,res)=>{


    const token = req.cookies.token

    res.cookie('token','')

   await redis.set(token,Date.now().toString())

    res.status(200).json({
        message : "user logout"
    })

}

module.exports = {
    registerController,
    loginController,
    getMe,
    logoutController
}