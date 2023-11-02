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
  isAdminOrAsesor,
  verifyToken,
} from "../middlewares/authJwt.js";

const router = Router();

// Rutas para el CRUD de contactos
router.post("/", crearContacto);
router.get("/", [verifyToken, isAdminOrAsesor], obtenerContactos);
router.get("/:id", [verifyToken, isAdminOrAsesor], obtenerContactoPorId);
router.put("/:id", [verifyToken, isAdminOrAsesor], actualizarContacto);
router.delete("/:id", [verifyToken, isAdmin], eliminarContacto);

// Ruta para actualizar el campo isAtendido
router.put("/setAtendido/:id", [verifyToken, isAdminOrAsesor], setAtendido);

export default router;
