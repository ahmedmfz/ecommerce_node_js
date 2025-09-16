import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


interface userRegisterDto {
    name: string;
    email: string;
    password: string;
}


export const registerUser = async ({email , password , name}: userRegisterDto) => {
    const existingUser = await userModel.findOne({email});
    if (existingUser) {
        return {data: "User already exists", status: 422};
    }

    const  hashedPassword = await bcrypt.hash(password, 10);
    const {name: userName, email : userEmail , _id} = await userModel.create({email, password: hashedPassword, name});

    return {
        data: generateJwt({userName , userEmail , _id}),
        status: 201
    };
}


interface userLoginDto {
    email: string;
    password: string;
}


export const loginUser = async ({email , password}: userLoginDto) => {
    const user = await userModel.findOne({email});
    if (!user) {
        return {data: "User not found", status: 422};
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return {data: "Invalid password", status: 422};
    }

    const {name, email : userEmail, _id} = user;
    return {
        data: generateJwt({name , userEmail , _id}),
        status: 200
    };

}


export const generateJwt = (data : any) => {
    return jwt.sign(data , '__my__first__app');
}