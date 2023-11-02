import { Router } from "express";
import {
  crearModelo,
  obtenerModelos,
  obtenerModeloPorId,
  eliminarModelo,
} from "../controllers/modelo.controller.js";

import { isAdmin, isAdminOrModerator, verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/", [verifyToken, isAdminOrModerator], crearModelo);

router.get("/", obtenerModelos);

router.get("/:id", obtenerModeloPorId);

router.delete("/:id", [verifyToken, isAdmin], eliminarModelo);

export default router;
