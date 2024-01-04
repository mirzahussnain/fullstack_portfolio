const isAuhtorized=async(req,res,next)=>{
    try {
        const user=req.user
        
        if(user&&user.isAdmin===true){
            req.user=user;
            next()
        }
        else{
            throw new Error("User is not authorized!")
        }
        
    } catch (error) {
        if(error.message==="User is not authorized!"){
            return res.status(401).json({
                status:false,
                message:error.message
            })
        }
        else{
            return res.status(400).json({
                status:false,
                message:error.message
            })
        }
       
    }
}

module.exports.isAuhtorized=isAuhtorized