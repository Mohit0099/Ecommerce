import express from "express";
import { createProductController, deleteProductController, deleteProductImageController, getAllProducts, getSingleProductController, updateProductController, updateproductImageController } from "../controllers/productController.js";
import userAuth from "../middleware/authmiddleware.js";
import { singleUpload } from "../middleware/multar.js";

const routes = express.Router();


//Get All products
routes.get('/get-all', getAllProducts)

//Get single products
routes.get('/get-singleproduct/:id', getSingleProductController)

routes.post('/create-product', userAuth, singleUpload, createProductController)

//UPDATE Product

routes.put('/update-product/:id', userAuth, updateProductController)

//update product image


routes.put('/update-image/:id', userAuth, singleUpload, updateproductImageController)

// delete product image

routes.delete('/delete-image/:id', userAuth, deleteProductImageController)

// delete product 

routes.delete('/delete-product/:id', userAuth, deleteProductController)


export default routes;