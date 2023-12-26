import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWt from "jsonwebtoken";


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'password length should grater than 6 chracter']
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    city: {
        type: String,
        required: [true, 'city is required'],
    },
    country: {
        type: String,
        required: [true, 'country is required'],
    },
    // phone: {
    //     type: String,
    //     required: [true, 'phone is required'],
    // },

    profilepic: {
        public_id: {
            type: String
        },
        url: {
            type: String
        },
    },

}, { timestamps: true });

// function 
userSchema.pre('save', async function (next) {
    //for upadte user prevent double encryption
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10);

});
//compare password user for login
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

//token generate  userId for user identity
userSchema.methods.generateToken = function () {
    return JWt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

export const userModel = mongoose.model("User", userSchema);

export default userModel;