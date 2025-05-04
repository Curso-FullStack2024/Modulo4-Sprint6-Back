import mongoose from "mongoose"


const languageSchema = new mongoose.Schema({
    
      iso_639_1: {
        type: String,
        required: true
      },
      english_name: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }, { timestamps: true });

export const Language = mongoose.model('Language', languageSchema);
