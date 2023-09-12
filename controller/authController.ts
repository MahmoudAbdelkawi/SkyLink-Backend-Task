import { PrismaClient, Products, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
const prisma = new PrismaClient()
const Products = prisma.products
interface UserType {
    email:string,
    name:string,
    role?:string,
    createdAt:Date,
    products: [],
}
const getMe = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    let {
        email,
        name,
        role,
        createdAt,
        id,
        image,
        // products
    }  = req.user
    
    let products : Products[] = []
    if(role === "VENDOR"){
        products = await Products.findMany({
            where:{
                authorId:id,
                published:true
            }
        })
    }
    res.json({
        user:{
            id,
            image,
            email,
            name,
            role,
            createdAt,
            products
        }
    });
})


export { getMe };