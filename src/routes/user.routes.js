import { Router } from "express";
import {
  createUser,
  getAuthUser,
  getUsers,
  updateActivo,
  updatePassword,
} from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.get("/yo", [verifyToken], getAuthUser);
router.post("/", [verifyToken, isAdmin], createUser);
router.get("/", [verifyToken, isAdmin], getUsers);
router.put("/pass/:userId", [verifyToken, isAdmin], updatePassword);
router.put("/isActivo/:userId", [verifyToken, isAdmin], updateActivo);

export default router;
