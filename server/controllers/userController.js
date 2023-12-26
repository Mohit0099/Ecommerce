import userModel from "../model/userModel.js"
import { getDataUri } from "../utils/features.js";
import cloudinary from 'cloudinary';


export const registerController = async (req, res) => {

    try {

        const { name, email, password, address, city, country } = req.body;

        if (!name || !email || !password || !address || !city || !country) {

            res.status(500).send({
                seccess: false,
                message: "please provide all fields"
            })
        }
        // check exising user

        const existinguser = await userModel.findOne({ email })

        //validation
        if (existinguser) {

            return res.status(200).send({
                success: true,
                message: "Email Already Exit"
            })
        }
        const user = await userModel.create({
            name, email, password, address, city, country
        });

        res.status(201).send({
            success: true,
            message: "Registered Succesfully",
            user

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register Api",
            error
        })
    }
}


export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        //Validation

        if (!email || !password) {
            return res.status(500).send({

                success: false,
                message: "Please add Email & Password"

            })
        }

        //check user email 

        const user = await userModel.findOne({ email });

        if (!user) {

            return res.status(404).send({
                success: false,
                message: "User not found Please Register"
            })
        }

        // check Password

        const isMatch = await user.comparePassword(password);

        //validation password

        if (!isMatch) {

            return res.status(500).send({

                success: false,
                message: "Invalid credentials"
            })
        }

        //Token pass 

        const token = user.generateToken();
        res.status(200).send({
            seccess: true,
            message: "Login Succesfully",
            token,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login Api",
            error
        })
    }

}


export const getUserProfileController = async (req, res) => {
    try {

        const user = await userModel.findById({ _id: req.user.userId });
        user.password = undefined;
        res.status(200).send({

            seccess: true,
            message: "user fetched Succesfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in profile  Api",
            error
        })
    }

}


export const logoutController = async (req, res) => {


    try {
        // const user = await userModel.findById({ _id: req.user.userId });
        // // user.GenerateRefreshToken();
        const user = await userModel.findById({ _id: req.user.userId });
        const token = user.generateToken();
        // token = undefined;
        res.status(200).cookie(token, " ", {
            expires: new Date(Date.now())
        }).send({

            success: true,
            message: "Logout Succesfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Logout   Api",
            error
        })
    }
}


export const updateProfileController = async (req, res) => {

    try {
        const user = await userModel.findById({ _id: req.user.userId });

        const { name, email, address, city, country, phone } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (address) user.address = address;
        if (city) user.city = city;
        if (country) user.country = country;
        if (phone) user.phone = phone;

        //save user
        await user.save()
        res.status(200).send({
            success: true,
            message: "user Profile Updated"
        })


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updateprofile Api",
            error
        })
    }
};


//update password

export const updatePasswordController = async (req, res) => {

    try {

        const user = await userModel.findById({ _id: req.user.userId })

        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {

            return res.status(500).send({
                success: false,
                message: "please provide old & new password"
            })
        }

        const isMatch = await user.comparePassword(oldPassword);

        //validation

        if (!isMatch) {
            return res.status(500).send({

                success: false,
                message: "Invalid old password"
            })
        }
        user.password = newPassword
        await user.save();

        res.status(200).send({
            success: true,
            message: "Password updated succesfully"

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updatepassword Api",
            error
        })
    }
}

//updat user profile photo


export const updateProfilePicController = async (req, res) => {


    try {

        const user = await userModel.findById({ _id: req.user.userId });

        if (!req.file) {
            return res.status(500).send({

                success: false,
                message: "Upload pic"
            })

        }
        //get file from user photo
        const file = getDataUri(req.file);


        //delete previous image 
        await cloudinary.v2.uploader.destroy(user.profilepic.public_id);

        // new update pic
        const cdb = await cloudinary.v2.uploader.upload(file.content);

        user.profilepic = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }

        // save pic in database

        await user.save();

        res.status(200).send({
            success: true,
            message: "profile picture updated"
        })


    } catch (error) {

        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in profile pic Api",
            error
        })

    }

}