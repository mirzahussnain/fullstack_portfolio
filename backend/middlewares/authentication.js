const {User}=require('../models/User')
const jwt=require('jsonwebtoken')

const isAuthenticated=async (req,res,next)=>{
try {
  if(req.session.authorization){
    const tokenBysession=req.session.authorization['token'];
   if(tokenBysession){
      jwt.verify(tokenBysession,process.env.JWT_SECRET,(err,user)=>{
        if(!err){
            req.user=user;
            next();
        }
        else{
           throw new Error('Invalid User')
        }
    });
    }
  
}
else{
    throw new Error( "Login To Access this resource");
}
  
   
} catch (error) {
    let statusCode = 404; // Default to Not Found

  if (error.message === "Login To Access this resource") {
    statusCode = 401; // Unauthorized
  } else if (error.message === "Invalid User") {
    statusCode = 403; // Forbidden
  }

  return res.status(statusCode).json({
    status: false,
    message: error.message,
  });
}
}

module.exports.isAuthenticated=isAuthenticated;