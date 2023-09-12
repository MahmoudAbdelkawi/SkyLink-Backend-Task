import { Products } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import { PrismaClient } from "@prisma/client"
import ApiError from "../utils/ApiError"
import { StatusCodes } from "http-status-codes"
const prisma = new PrismaClient()
const Products = prisma.products
const Categories = prisma.category

const addProduct = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.user
    const {title , categoryId} = req.body

    const categroy = await Categories.findUnique({
        where:{
            id:Number(categoryId)
        }
    });
    if(!categroy){
        return next(new ApiError("category not found",StatusCodes.NOT_FOUND))
    }
    const product = await Products.create({
        data:{
            title:title,
            authorId:id,
            categoryId:categoryId
        }});
    res.status(StatusCodes.CREATED).json({
        message:"product added successfully",
        data : {product}
    });
})

const deleteProduct = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.user
    const {productId} = req.params
    
    const product = await Products.findUnique({
        where:{
            id:Number(productId),
            authorId:id,
            published:true
        }
    });

    if(!product){
        return next(new ApiError("product not found",404))
    }

    await Products.update({
        where:{
            id:Number(productId)
        },
        data:{
            published:false
        }
    })
    res.status(StatusCodes.OK).json({
      message: "product deleted successfully",
      data: {
        productId,
      },
    });
})

const searchOnProduct = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const {title , page = 1 , limit = 10} = req.query

    const products = await Products.findMany({
        include:{
            category:true,
            author:true
        },
        skip: (+page - 1) * +limit,
        take: +limit,
        where:{
            title:{
                contains:title as string,
            },
            published:true
        }
    });
    res.status(StatusCodes.OK).json({
        message:"products fetched successfully",
        data: {products}
    });
})

const getAllProduct = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { page = 1 , limit = 10} = req.query

    const products = await Products.findMany({
        include:{
            category:true
        } ,
        skip: (+page - 1) * +limit,
        take: +limit,
    })
    res.status(StatusCodes.OK).json({
        message:"product added successfully",
        data:{products}
    });
})

const updateProduct = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const {id} = req.user
    const {productId} = req.params
    const {title} = req.body
    const product = await Products.findUnique({
        where:{
            id:Number(productId),
            authorId:id,
            published:true
        }
    });
    if(!product){
        return next(new ApiError("product not found",404))
    }
    const newProduct = await Products.update({
        where:{
            id:Number(productId)
        },
        data:{
            title:title
        }
    })
    
    res.status(StatusCodes.OK).json({
        message:"product updated successfully",
        data:{product:newProduct}
    });
})


export { addProduct , deleteProduct , searchOnProduct , getAllProduct , updateProduct }