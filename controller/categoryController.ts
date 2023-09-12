import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import ApiError from "../utils/ApiError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient()
const Categories = prisma.category


const addCategory  = expressAsyncHandler(async (req:Request,res : Response,next : NextFunction) => {
    const {name} = req.body
    const category = await Categories.create({
        data:{
            name
        }
    })
    res.status(StatusCodes.CREATED).json({
        message:"category added successfully",
        data:{category}
    })
})


const getAllCategories  = expressAsyncHandler(async (req:Request,res : Response,next : NextFunction) => {
    const categories = await Categories.findMany()
    res.status(StatusCodes.OK).json({
        message:"categories fetched successfully",
        data:{categories}
    })
})

export { addCategory , getAllCategories }