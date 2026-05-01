
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const blacklistModel = require('../models/blacklistingModel');
const redis = require('../config/cache')

const isLoggedIn = async(req,res,next)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(403).json({
            message : "token not found"
        })
    }

    const isTokenValid = await redis.get(token)

    if(isTokenValid){
        return res.status(401).json({
            message : "Invalid Token"
        })
    }

    

   try{ 
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = decoded;

    next()
   }catch(err){
    console.log(err);
   }


}

module.exports = isLoggedIn