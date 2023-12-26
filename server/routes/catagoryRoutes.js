import express from "express";
import userAuth from "../middleware/authmiddleware.js";
import { createCategoryController, deleteCatagoryController, getAllCategory, updateCatagoryController } from "../controllers/catagoryController.js";

const routes = express.Router();



routes.post('/create-category', userAuth, createCategoryController)
//delete category

routes.delete('/delete-category/:id', userAuth, deleteCatagoryController)
// get all category


routes.get('/get-category', userAuth, getAllCategory)

//update
routes.put('/update-category/:id', userAuth, updateCatagoryController)

export default routes;