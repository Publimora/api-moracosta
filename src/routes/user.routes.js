import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAuthUser,
  getUsers,
  updatePassword,
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
router.put("/:userId", [verifyToken, isAdmin], updatePassword);

export default router;
