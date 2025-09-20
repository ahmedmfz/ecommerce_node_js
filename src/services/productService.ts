import productModel from "../models/productModel";


export const getAllProducts  = async() => {
    return await productModel.find();
}

 
export const seedInitialProducts = async() => {
    const products = [
        {title : "product 1" , price : 1000 , image : "https://picsum.photos/id/1/200/300" , stock : 50},
        {title : "product 2" , price : 1000 , image : "https://picsum.photos/id/1/200/300" , stock : 30},
        {title : "product 3" , price : 1000 , image : "https://picsum.photos/id/1/200/300" , stock : 60},
        {title : "product 4" , price : 1000 , image : "https://picsum.photos/id/1/200/300" , stock : 80},
        {title : "product 5" , price : 1000 , image : "https://picsum.photos/id/1/200/300" , stock : 90},
    ];

    const existingProducts = await getAllProducts();

    if(existingProducts.length === 0){
        await productModel.insertMany(products);
    }
}