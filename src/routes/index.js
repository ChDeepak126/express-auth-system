import { Router } from "express";
import productRouter from './products.js';
import userRouter from './users.js';
const route=Router();
route.use(productRouter);
route.use(userRouter);
export default route;