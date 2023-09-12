import { Router } from "express";
import { protect, role } from "../middlewares/protect";
import { addCategory, getAllCategories } from "../controller/categoryController";
import { categoryValidation } from "../utils/validation/categoryValidation";
import validResult from "../middlewares/validationResult";


var router = Router();

/* GET users listing. */
router.post('/addCategory', protect , role(["ADMIN"]) , categoryValidation , validResult  , addCategory);
router.get('/getAllcategory', protect , role(["ADMIN" , "BUYER" , "VENDOR"]) , getAllCategories);

export default router;