import cartModel from "../models/cartModel";
import productModel from "../models/productModel";


interface ICreateUserCart {
    userId : number | string
}


interface IGetUserCart { 
    userId : number | string
}


const createUserCart  = async ({userId} : ICreateUserCart) => {
    const cart = await cartModel.create({
        userId, 
        totalAmount: 0, 
        items: [], 
        status: "active"
    });
    return cart;
}


export const getUserCart = async ({userId} : IGetUserCart) => {
    let activeCart =  await cartModel.findOne({userId , status : "active"});

    if(!activeCart){
        activeCart =  await createUserCart({userId});
    }

    return activeCart;
}


interface IAddIitemToCart {
    userId : string,
    productId : string,
    quantity : number 
}

export const addItemToCart = async( {userId , productId ,quantity} : IAddIitemToCart) => {
    const activeCart = await getUserCart({userId});

    const existsInCart = activeCart.items.find((p) => p.product.toString() === productId);

    if(existsInCart){
        return { data : "item already exists in cart" , statusCode : 422}
    }

    const product = await productModel.findOne({_id: productId});

    if(!product){
        return { data : "product not found" , statusCode : 422}
    }

    if(product.stock < quantity){
        return { data : "Low Stock " , statusCode : 422}
    }

    activeCart.items.push({
        product : productId ,
        quantity :quantity , 
        unitPrice : product.price
    });

    activeCart.totalAmount = product.price * quantity 
    await activeCart.save();
    return  { data : activeCart , statusCode : 201};
}
