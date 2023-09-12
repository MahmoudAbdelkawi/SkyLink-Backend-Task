import { loginValidation, signupValidation } from "../utils/validation/authValidation";
import validResult from "../middlewares/validationResult";
import { login, signUp, updateImage } from "../controller/userController";
import { Router } from "express";
import { protect } from "../middlewares/protect";
import { imageResizing, uploadMiddlewareImage } from "../middlewares/uploadImage";

var router = Router();

/* GET users listing. */
router.post('/signup', signupValidation , validResult ,signUp );
router.post('/login', loginValidation , validResult ,login );
router.put('/updateImage', protect , uploadMiddlewareImage, imageResizing , updateImage)
// don't forget update image

export default router;
