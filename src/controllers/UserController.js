const  UserServices=require ('../services/UserServices')
const  JwtService=require ('../services/JwtService')

//api dang ky
const createUser= async(req,res)=>{
    try{
        const {name , email , password, confirmPassword}=req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isCheckEmail = reg.test(email)
        if ( !email || !password || !confirmPassword   ){
            return res.status(200).json({
                status:'ERR',
                message:'dau vao bat buoc'
            })
        }
        else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            })
        }
        else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Mật khẩu không khớp'
            })
        }
        const response= await UserServices.createUser(req.body)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
//api dang nhap
const loginUser= async(req,res)=>{
    try{
        const { email , password}=req.body
        const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const isCheckEmail = reg.test(email)
        if ( !email || !password ){
            return res.status(200).json({
                status:'ERR',
                message:'dau vao bat buoc'
            })
        }
        else if(!isCheckEmail){
            return res.status(200).json({
                status: 'ERR',
                message: 'Email không hợp lệ'
            })
        }
        
        const response= await UserServices.loginUser(req.body)
        const {refresh_token, ...newReponse } = response
        res.cookie('refresh_token',refresh_token,{
            httpOnly: true,
            secure: false,
            samesite: "strict",
            path:'/'
        });
         return res.status(200).json(newReponse)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
//update tt
const updateUser= async(req,res)=>{
    try{
        const userId=req.params.id
        const data =req.body
        if(!userId){
            return res.status(200).json({
                status:'ERR',
                message:'userid bat buoc'
            })
        }


        const response= await UserServices.updateUser(userId,data)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
// xoa tt
const deleteUser= async(req,res)=>{
    try{
        const userId=req.params.id
        if(!userId){
            return res.status(200).json({
                status:'ERR',
                message:'userid bat buoc'
            })
        }


        const response= await UserServices.deleteUser(userId)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}

const getAllUser= async(req,res)=>{
    try{
        const response= await UserServices.getAllUser()
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
///
const getDetailsUser= async(req,res)=>{
    try{
        const userId=req.params.id
        if(!userId){
            return res.status(200).json({
                status:'ERR',
                message:'userid bat buoc'
            })
        }
        const response= await UserServices.getDetailsUser(userId)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
const refreshToken= async(req,res)=>{

    try{
        const token=req.cookies.refresh_token
        if(!token){
            return res.status(200).json({
                status:'ERR',
                message:'the token bat buoc'
            })
        }
        const response= await JwtService.refreshTokenJwtService(token)
         return res.status(200).json(response)
        return
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}

// logout
const logoutUser= async(req,res)=>{
    try{
        res.clearCookie('refresh_token')
         return res.status(200).json({
            status:'ok',
            message:'dang xuat thanh cong'
         })

    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}


module.exports={
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser
}