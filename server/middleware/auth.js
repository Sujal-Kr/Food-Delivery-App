const jwt =require('jsonwebtoken')


const protectRoute=async(req,res,next)=>{

    const token=req.headers.token
   
    console.log("Token:",token)
    if(!token){
        return res.json({
            success: false,
            message: 'user not logged in'
        })
    }else{
        try{
            const payload=jwt.verify(token,process.env.JWT_KEY)
            if(payload){
                console.log("Payload",payload);
                req.id=payload.payload
                next()
            }else{
                return res.json({
                    success: false,
                    message:"payload verification failed"
                })
            }
        }catch(err){
            res.status.json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports =protectRoute



