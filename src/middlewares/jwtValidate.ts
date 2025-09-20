import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import userModel from "../models/userModel";
import { ExtendedRequest } from "../types/ExtentedRequest";


const validateJwt = (req : ExtendedRequest , res : Response , next : NextFunction) => {
    const authorationHeaders = req.get('authorization');
  
    if(!authorationHeaders){
        res.status(401).send("authentication falied");
        return;
    }

    const token = authorationHeaders?.split(" ")[1];

    if(!token){
        res.status(401).send("Invaild Token");
        return;
    }   

    jwt.verify(token , '__my__first__app' , async (err , payload) => {
        if(err) {
            res.status(401).send("Invaild Token");
            return; 
        }

        if(!payload){
            res.status(401).send("Invaild Token");
            return;
        }
    
       const userPayload =  payload as {
                                name :string ,
                                userEmail : string
                            }

        const user = await userModel.findOne({email : userPayload.userEmail})

       
        if (!user) {
            res.status(401).send("User not found");
            return;
        }
        
        req.user = {
            id : (user._id as any).toString(),
            userName: userPayload.name,
            userEmail: userPayload.userEmail
        };
        next();
    })
}


export default validateJwt;