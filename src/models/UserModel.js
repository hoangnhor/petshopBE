<<<<<<< HEAD
const mongoose=require('mongoose')


const userSchema=new mongoose.Schema(
    {
        name:{type:String},
        email:{type:String,required:true, unique:true},
        password:{type: String, required: true},
        isAdmin:{type: Boolean, default: false , required:true},
        phone: {type : Number},
        address:{type:String},
        avatar: {type:String},
   
=======
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        phone: { type: Number },
        address: { type: String },
        avatar: { type: String },

>>>>>>> 0594244 (first commit)
    },
    {
        timestamps: true
    }
);
<<<<<<< HEAD
const User=mongoose.model("User",userSchema);
module.exports=User
=======
const User = mongoose.model("User", userSchema);
module.exports = User
>>>>>>> 0594244 (first commit)
