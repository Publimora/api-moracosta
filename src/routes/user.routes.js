import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAuthUser,
  getUsers,
} from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/authJwt.js";
import {
  checkExistingRole,
  checkExistingUser,
} from "../middlewares/verifySignup.js";

const router = Router();

router.get("/yo", [verifyToken], getAuthUser);
router.post(
  "/",
  [verifyToken, isAdmin, checkExistingUser, checkExistingRole],
  createUser
);
router.get("/", [verifyToken, isAdmin], getUsers);
router.delete("/:userId", [verifyToken, isAdmin], deleteUser);

export default router;
