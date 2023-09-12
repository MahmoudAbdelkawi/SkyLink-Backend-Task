import { Router } from "express";
import { protect, role } from "../middlewares/protect";
import { getMe } from "../controller/authController";

var router = Router();

/* GET users listing. */
router.get('/getMe', protect , role(["BUYER", "VENDOR","ADMIN"]) , getMe);

export default router;
