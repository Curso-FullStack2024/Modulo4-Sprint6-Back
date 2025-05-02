import mongoose from "mongoose"
import { User } from "./userModel.js";


const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required:true
    },
     user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    
}, { timestamps: true });

export const Profile = mongoose.model('Profile', profileSchema);
