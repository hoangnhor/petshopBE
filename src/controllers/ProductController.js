const  ProductService=require ('../services/ProductService')


//api san pham
const createProduct= async(req,res)=>{
    try{
        const {name , image , type, price, countInStock,description}=req.body    
        if (!name|| !image || !type || !price|| !countInStock){
            return res.status(200).json({
                status:'ERR',
                message:'dau vao bat buoc'
                
            })
        }
        console.log('response',req.body)
        const response= await ProductService.createProduct(req.body)
       
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
// cap nhat sam phâm 
const updateProduct= async(req,res)=>{
    try{
        const productId=req.params.id
        const data =req.body
        if(!productId){
            return res.status(200).json({
                status:'ERR',
                message:'id sản phấm bat buoc'
            })
        }


        const response= await ProductService.updateProduct(productId,data)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
//
const getDetailsProduct= async(req,res)=>{
    try{
        const productId=req.params.id
        if(!productId){
            return res.status(200).json({
                status:'ERR',
                message:'id san pham bat buoc'
            })
        }
        const response= await ProductService.getDetailsProduct(productId)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
// xoa san pham
const deleteProduct= async(req,res)=>{
    try{
        const productId=req.params.id
        if(!productId){
            return res.status(200).json({
                status:'ERR',
                message:'id san pham bat buoc'
            })
        }


        const response= await ProductService.deleteProduct(productId)
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}

const getAllProduct= async(req,res)=>{
    
    try{
        const { limit, page, sort, filter }= req.query
        const response= await ProductService.getAllProduct(Number(limit) || 8  , Number(page) || 0, sort )
         return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message :e
        })  
    }
}
module.exports={
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct
}