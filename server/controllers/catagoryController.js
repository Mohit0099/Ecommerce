
import categoryModel from "../model/categorymodel.js";
import productModel from "../model/productModel.js";

export const createCategoryController = async (req, res) => {

    try {

        const { category } = req.body;

        if (!category) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Category Name",
                error
            })
        }

        const existinguser = await categoryModel.findOne({ category })

        //validation
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exit"
            })
        }

        // const categorysmall = category.toLowerCase();

        await categoryModel.create({ category });

        res.status(201).send({
            success: true,
            message: `${category} Succesfully`

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in create Category Api",
            error
        })
    }
}



export const deleteCatagoryController = async (req, res) => {

    try {
        const catagory = await categoryModel.findById(req.params.id);

        if (!catagory) {
            return res.status(404).send({
                success: false,
                message: "Product Not Found"
            })

        }

        const products = await productModel.find({ category: catagory._id })
        for (let i = 0; i < products.length; i++) {

            const product = products[i];
            product.category = undefined;
            await product.save();
        }

        await catagory.deleteOne();
        res.status(200).send({
            success: true,
            message: "Product deleted Succesfully",


        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in delete image Products",
            error
        })
    }
}



export const getAllCategory = async (req, res) => {

    try {

        const catagory = await categoryModel.find({});

        res.status(200).send({

            success: true,
            message: "All Category fetch Succesfully",

            total: catagory.length,
            catagory
        })

    } catch (error) {

        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in Getall Products",
            error
        })

    }


}



//update Category


export const updateCatagoryController = async (req, res) => {

    try {
        const catagory = await categoryModel.findById(req.params.id);

        if (!catagory) {
            return res.status(404).send({
                success: false,
                message: "Product Not Found"
            })

        }

        const { updatedcategory } = req.body;

        const products = await productModel.find({ category: catagory._id })

        for (let i = 0; i < products.length; i++) {

            const product = products[i];
            product.category = updatedcategory;
            await product.save();
        }

        if (updatedcategory) catagory.category = updatedcategory
        await catagory.save();
        res.status(200).send({
            success: true,
            message: "Category Updated Succesfully",


        })

    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Error in delete image Products",
            error
        })
    }
}




export const get_category = async () => {
    try {
        return categoryModel.find({});

    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });

    }
}