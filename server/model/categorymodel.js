import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "product name is required"],
        unique: true,
    },



}, {
    timestamps: true
});


export const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;