import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    }
    
})


export const Permission = mongoose.model('Permission', permissionSchema);