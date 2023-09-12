import { Router } from "express";
import { protect, role } from "../middlewares/protect";
import { addProduct, deleteProduct, getAllProduct, searchOnProduct, updateProduct } from "../controller/productController";
import validResult from "../middlewares/validationResult";
import { productValidation } from "../utils/validation/productValidation";

var router = Router();

router.post('/addProduct', protect , role(["VENDOR"]),productValidation , validResult , addProduct);
router.delete('/deleteProduct/:productId', protect , role(["VENDOR"]) , deleteProduct);
router.get('/searchOnProduct/', protect , role(["VENDOR" , "BUYER" , "ADMIN"]) , searchOnProduct);
router.get('/getAllProduct/', protect , role(["VENDOR" , "BUYER" , "ADMIN"]) , getAllProduct);
router.patch('/updateProduct/:productId', protect , role(["VENDOR" , "BUYER"]), productValidation , validResult , updateProduct);

export default router;
