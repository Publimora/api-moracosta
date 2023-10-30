import { Router } from "express";

import {
  crearContacto,
  obtenerContactos,
  obtenerContactoPorId,
  actualizarContacto,
  eliminarContacto,
  setAtendido,
} from "../controllers/contacto.controller.js";
import {
  isAdmin,
  isAsesor,
  isModerator,
  verifyToken,
} from "../middlewares/authJwt.js";

const router = Router();

// Rutas para el CRUD de contactos
router.post("/", [verifyToken, isAdmin, isModerator, isAsesor], crearContacto);
router.get("/", obtenerContactos);
router.get("/:id", obtenerContactoPorId);
router.put(
  "/:id",
  [verifyToken, isAdmin, isModerator, isAsesor],
  actualizarContacto
);
router.delete(
  "/:id",
  [verifyToken, isAdmin, isModerator, isAsesor],
  eliminarContacto
);

// Ruta para actualizar el campo isAtendido
router.put(
  "/setAtendido/:id",
  [verifyToken, isAdmin, isModerator, isAsesor],
  setAtendido
);

export default router;
