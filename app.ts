
import express, { NextFunction, Request, Response } from 'express';

import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import { User } from '@prisma/client';

dotenv.config()

var app = express();

// global namespace
declare global {
  namespace Express {
    interface Request {
      user: User;
      fileName:string;
    }
  }
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'images')));
app.use(cors())

app.listen(4000,()=>{
    console.log("server is running......")
})



module.exports = app;