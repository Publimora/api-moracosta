import { Router } from "express";

import {
  crearContacto,
  obtenerContactos,
  obtenerContactoPorId,
  actualizarContacto,
  eliminarContacto,
  setAtendido,
} from "../controllers/contacto.controller.js";

const router = Router();

// Rutas para el CRUD de contactos
router.post("/", crearContacto);
router.get("/", obtenerContactos);
router.get("/:id", obtenerContactoPorId);
router.put("/:id", actualizarContacto);
router.delete("/:id", eliminarContacto);

// Ruta para actualizar el campo isAtendido
router.put("/setAtendido/:id", setAtendido);

export default router;
