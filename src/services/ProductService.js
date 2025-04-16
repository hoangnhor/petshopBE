const Product = require("../models/ProductModel")


//tao api san pham
const createProduct=(newProduct )=>{
    return new Promise(async (resolve, reject) =>{
        const {name , image , type, price, countInStock,description}=newProduct   
        try{
            const checkProduct = await Product.findOne({
                name:name
            })
            if(checkProduct !== null){
                resolve({
                    status:'OK',
                    message: 'ten san pham da ton tai'
                })
            }
            //tao api san pham
            const newProduct = await Product.create({
                name , image , type, price, countInStock,description
            })
            if(newProduct){
                resolve({
                    status:'OK',
                    message:'thanh cong',
                    data: newProduct
                })
            }           
        }catch(e){
            reject(e) 
        }
    })
}
// cap nhat san pham
const updateProduct=(id,data)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id:id
             })
                if(checkProduct === null){
                resolve({
                    status:'OK',
                    message: ' sản phẩm kh xác định'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data,{ new: true })
            
           
            return resolve({
                status:'OK',
                message:'thanh cong',
                data:updateProduct
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}
//xoa san pham
const deleteProduct=(id)=>{
    return new Promise(async (resolve, reject) =>{
        try{
            const checkProduct = await Product.findOne({
                _id:id
             })
                if(checkProduct===null){
                return resolve({
                    status:'OK',
                    message: 'san pham khong ton tai'
                })
            }
            await Product.findByIdAndDelete(id)
            
            return resolve({
                status:'OK',
                message:' xoa thanh cong',
                
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}

// 
const getAllProduct=(limit, page, sort, filter )=>{
    
    return new Promise(async (resolve, reject) =>{
        try{
            const totalProduct = await Product.countDocuments()

            if(filter){
                const label = filter[0];
              
                const allObjectFilter= await Product.find({ [label]:{'$regex': filter [1] }}).limit(limit).skip(page * limit)
                resolve({
                    status:'OK',
                    message:' thanh cong',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent : Number(page + 1),
                    totalPage : Math.ceil(totalProduct / limit)
                })
            }
            if(sort){
                
                const objectSort={}
                objectSort[sort[1]]= sort[0]
                
                const allProductSort= await Product.find().limit(limit).skip(page * limit).sort(objectSort)
                resolve({
                    status:'OK',
                    message:' thanh cong',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent : Number(page + 1),
                    totalPage : Math.ceil(totalProduct / limit)
                })
            }
            const allProduct= await Product.find().limit(limit).skip(page * limit)
           
             resolve({
                status:'OK',
                message:' thanh cong',
                data: allProduct,
                total: totalProduct,
                pageCurrent : Number(page + 1),
                totalPage : Math.ceil(totalProduct / limit)
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}
///
const getDetailsProduct = (id) =>{
    return new Promise(async (resolve, reject) =>{
        try{
            const product = await Product.findOne({
                _id:id
             })
                if(product===null){
                return resolve({
                    status:'OK',
                    message: 'san pham khong ton tai'
                })
            } 
            return resolve({
                status:'OK',
                message:' thanh cong',
                data: product
            })
                     
        }catch(e){
            reject(e) 
        }
    })
}
module.exports={
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
}