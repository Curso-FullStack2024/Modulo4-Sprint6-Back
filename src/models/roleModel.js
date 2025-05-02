import mongoose from "mongoose"
import { Permission } from './permissionModel.js';

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission'
    }]
}, { timestamps: true });

export const Role = mongoose.model('Role', roleSchema);
// module.exports = Role;