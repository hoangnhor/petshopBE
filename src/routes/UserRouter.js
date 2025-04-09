const express = require('express')
const router =express.Router()
const UserController=require('../controllers/UserController')
const { authMiddleware,authUserMiddleware } = require('../middleware/authMiddleware')



router.post('/sign-up',UserController.createUser)
// dang nhap 
router.post('/sign-in',UserController.loginUser)
//logout
router.post('/log-out',UserController.logoutUser)

//update tt
router.put('/update-user/:id',authUserMiddleware,UserController.updateUser)
//xoa tt
router.delete('/delete-user/:id',authMiddleware,UserController.deleteUser)
//lay nguoi dung
router.get('/getAll',authMiddleware,UserController.getAllUser)
//
router.get('/get-details/:id',authUserMiddleware,UserController.getDetailsUser)
//
router.post('/refresh-token',UserController.refreshToken)


module.exports=router