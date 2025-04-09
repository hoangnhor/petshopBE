const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const authMiddleware=(req,res,next)=>{
    
    const token=req.headers.token?.split(' ')[1]
    jwt.verify(token,process.env.ACCESS_TOKEN, function (err,user){
        if(err){
            return res.status(404).json({
                message:'xac thuc',
                status:'error'
            })
        }
        
        if(user?.isAdmin){
            next();
        }else{
            return res.status(401).json({
                message:'Xác thực thất bại',
                status:'error'
            })
        }
    });
}

//cap token moi khi het han
const authUserMiddleware=(req,res,next)=>{
    
    const token=req.headers.token?.split(' ')[1]
    const userid=req.params.id
    jwt.verify(token,process.env.ACCESS_TOKEN, function (err,user){
        if(err){
            return res.status(404).json({
                message:'xac thuc',
                status:'error'
            })
        }
        console.log('user',user)
      
        if(user?.isAdmin ||user?.id===userid){
            next();
        }else{
            return res.status(401).json({
                message:'Xác thực thất bại',
                status:'error'
            })
        }
    });
}
module.exports={
    authMiddleware,
    authUserMiddleware
}