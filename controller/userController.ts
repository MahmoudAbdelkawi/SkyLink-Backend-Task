import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient()
const Users = prisma.user

const signUp = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { email, name, password , role } = req.body;
    const hashedPassword:string = await hash(password,12)
        const user = await Users.create({
            data: {
                email,
                name,
                password:hashedPassword,
                role
            },
        });
        const token : string = sign({id:user.id , role:user.role ,email: user.email},`${process.env.JWT_SECRET_KEY}`,{expiresIn:`${process.env.EXPIRATION_TIME}`} ) ;
        res.status(StatusCodes.CREATED).json({ data:{user} , message : "user created successfully" , token });
});

const login = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body;
    const user = await Users.findUnique({where:{email}})
    if (!user) {
        return next(new ApiError("Error in email or password",404))
    }
    const isMatch = await compare(password, user?.password as string);
    if (!isMatch) {
        return next(new ApiError("Error in email or password",404))
    }
    const token : string = sign({id:user?.id , role:user?.role ,email: user?.email},`${process.env.JWT_SECRET_KEY}`,{expiresIn:`${process.env.EXPIRATION_TIME}`} ) ;

    res.status(StatusCodes.OK).json({ message : "user logged in successfully" , token });

});

const updateImage = expressAsyncHandler(async (req:Request, res:Response, next:NextFunction) => {
    const { id } = req.user;
    const { fileName } = req;
    const protocol = req.protocol; // HTTP or HTTPS
    const host = req.get('host'); // Hostname and port
    const url = `${protocol}://${host}`;
    const user = await Users.update({
        where:{
            id
        },
        data:{
            image:url+"/"+fileName
        }
    })
    res.status(StatusCodes.OK).json({ message : "user image updated successfully" , data:{user} });
});


export { signUp , login , updateImage };