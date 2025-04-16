const User = require("../models/UserModel")
const bcrypt =require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

//tao api dang ky
const createUser=(newUser )=>{
    return new Promise(async (resolve, reject) =>{
        const { name, email , password, phone}=newUser 
        try{
            const checkUser = await User.findOne({
                email:email
            })
            if(checkUser !== null){
               return resolve({
                    status:'err',
                    message: 'email da ton tai'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
           
            //tao api dang ky
            const createdUser= await User.create({
                name ,
                email , 
                password: hash,              
                phone
            })
            if(createdUser){
              return  resolve({
                    status:'OK',
                    message:'thanh cong',
                    data:createdUser
                })
            }           
        }catch(e){
            reject(e) 
        }
    })
}

//tao api dang nhap
const loginUser=(userLogin)=>{
    return new Promise(async (resolve, reject) =>{
        const { email , password,}=userLogin
        try{
            const checkUser = await User.findOne({
                email:email
            })
            if(!checkUser){
                resolve({
                    status:'OK',
                    message: 'nguoi dung khong ton tai'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            
            console.log('comparePassword', comparePassword)
           
            if(!comparePassword){
                resolve({
                    status:'ERR',
                    message:'mat khau hoac nguoi dung khong chinh xac'
                })
            }

            const access_token=await genneralAccessToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id:checkUser.id,
                isAdmin:checkUser.isAdmin
            })

            
           
             resolve({
                status:'OK',
                message:'thanh cong',
                access_token,
                refresh_token
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}

//tao api update
const updateUser=(id,data)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const checkUser = await User.findOne({
                _id:id
             })
                if(checkUser===null){
                resolve({
                    status:'OK',
                    message: 'nguoi dung khong ton tai'
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data,{ new: true })
            
           
            return resolve({
                status:'OK',
                message:'thanh cong',
                data:updatedUser
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}
//xoa tt 
const deleteUser=(id)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const checkUser = await User.findOne({
                _id:id
             })
                if(checkUser===null){
                return resolve({
                    status:'OK',
                    message: 'nguoi dung khong ton tai'
                })
            }
            await User.findByIdAndDelete(id)
            
            return resolve({
                status:'OK',
                message:' xoa thanh cong',
                
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}

//nhan tât ca nguoi dung
const getAllUser=()=>{
    return new Promise(async (resolve, reject) =>{
        try{
     
           const allUser= await User.find() 
            return resolve({
                status:'OK',
                message:' thanh cong',
                data:allUser
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}
///lay chi tiet nguoi dung
const getDetailsUser=(id)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const user = await User.findOne({
                _id: id
             })
        
                if(user===null){
                return resolve({
                    status:'OK',
                    message: 'nguoi dung khong ton tai'
                })
            } 
            return resolve({
                status:'OK',
                message:' thanh cong',
                data:user
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}

module.exports={
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    
}