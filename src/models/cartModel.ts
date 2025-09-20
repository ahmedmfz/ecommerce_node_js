import mongoose, { Schema , Document, ObjectId } from "mongoose";
import { IProduct } from "./productModel";


const cartStatus = ["active", "completed"];


export interface ICartItem {
   product : ObjectId | string,
   quantity : number ,
   unitPrice : number
}


export interface ICart extends Document {
    userId : ObjectId | string,
    totalAmount : number,
    items : ICartItem[] , 
    status : "active" | "completed"
}


const cartItemSchema = new Schema<ICartItem>({
    product : {type: Schema.Types.ObjectId , ref : "Product" , required : true},
    quantity : {type: Number , required : true , default : 1},
    unitPrice : {type: Number , required : true },
})


const cartSchema  = new Schema<ICart>({
    userId : {type : Schema.Types.ObjectId  , ref : "User" , required : true},
    totalAmount : {type: Number , required : true  , default : 0},
    items : [cartItemSchema],
    status : {type: String , enum : cartStatus , required : true }
})


const cartModel = mongoose.model("Cart" , cartSchema);


export default cartModel;