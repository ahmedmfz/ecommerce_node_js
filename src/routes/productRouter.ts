import express from "express";
import { getAllProducts } from "../services/productService";


const productRouter = express.Router();


productRouter.get("/" , async (req , res) => {
    const products = await getAllProducts();
    res.status(200).json(products);
})

export default productRouter ;