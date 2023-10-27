import { Router } from "express";
import {
  crearMarca,
  obtenerMarcas,
  obtenerMarcaPorId,
  eliminarMarca,
} from "../controllers/marca.controller.js";

import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/", [verifyToken, isModerator], crearMarca);

router.get("/", obtenerMarcas);

router.get("/:id", obtenerMarcaPorId);

router.delete("/:id", [verifyToken, isAdmin], eliminarMarca);

export default router;
