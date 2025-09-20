import express, { Request, Response } from "express";
import {getUserCart, addItemToCart} from "../services/cartService";
import validateJwt from "../middlewares/jwtValidate";
import { ExtendedRequest } from "../types/ExtentedRequest";


const cartRouter = express.Router();


cartRouter.get("/" , validateJwt , async (req: ExtendedRequest , res: Response) => {
    const userId = req.user.id;
    const cart =  await getUserCart({userId : userId});
    res.status(200).json(cart);
})


cartRouter.post("/items" , validateJwt , async (req: ExtendedRequest , res: Response) => {
    const userId = req.user.id;
    const {productId ,quantity}  = req.body;
    const response = await addItemToCart({userId , productId , quantity});
    
    res.status(response.statusCode).json(response.data);
})


export default cartRouter;