import express from "express";
import { getAllUsers, getUser, deleteUser, updateUser } from "../controllers/users"
import { isAdmin, isAuth } from "../../security/middlewares/authentication"
import { authorization } from "../../security/middlewares/authorization";

const router = express.Router();


router.get("/", isAdmin, getAllUsers);
router.get("/:userId", isAuth, authorization, getUser);
router.put("/:userId", isAuth, authorization, updateUser);
router.delete("/:userId", isAuth, authorization, deleteUser);


export default router;