import express from 'express'
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors'
import dotenv from 'dotenv'

import cludinary from "cloudinary"
import connectDb from './server/config/db.js';
import userroutes from './server/routes/userRoutes.js';

import productroutes from './server/routes/productRoutes.js'

import categoryroutes from './server/routes/catagoryRoutes.js'




//dotenv config

dotenv.config();

//database connect
connectDb();

//cloudinary  config
cludinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

//rest object
const app = express()


//middlewares
app.use(morgan('dev')) //show request api hit
app.use(express.json());
app.use(cors());


//routes

app.use("/api/v1/user", userroutes)

app.use('/api/v1/product', productroutes)

app.use('/api/v1/category', categoryroutes)

// app.get('/', (req, res) => {

//     return res.status(200).send("<h1> Welcome back </h1>");
// });


//port

const PORT = process.env.PORT || 8080;


//listen

app.listen(PORT, () => {

    console.log(`port running on ${process.env.PORT}`.bgMagenta.green);
});

