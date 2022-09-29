import { Router } from "express";
import UserController from "../Controller/User";
import LoginController from '../Controller/Login'



const router = Router();

router.post("/signup", UserController.registration);
router.post("/login", LoginController.login);
router.put("/user/edit/:id", UserController.ediUser);
router.delete("/user/delete/:id", UserController.deleteUser);

export default router;
