
import { check } from "express-validator";
const categoryValidation = [
    check('name').notEmpty().withMessage("title is required")
]

export {categoryValidation}
