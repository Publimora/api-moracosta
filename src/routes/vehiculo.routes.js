import { Router } from "express";
import {
  createVehiculo,
  getVehiculos,
  deleteVehiculo,
  getVehiculoById,
  updateVehiculo,
} from "../controllers/vehiculo.controller.js";

import { isAdminOrModerator, verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/", [verifyToken, isAdminOrModerator], createVehiculo);

router.put("/:id", [verifyToken, isAdminOrModerator], updateVehiculo);

router.get("/", getVehiculos);

router.get("/:id", getVehiculoById);

router.delete("/:id", [verifyToken, isAdminOrModerator], deleteVehiculo);

export default router;
