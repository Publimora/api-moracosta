import { Router } from "express";
import {
  createVehiculo,
  getVehiculos,
  deleteVehiculo,
  getVehiculoById,
  updateVehiculo,
} from "../controllers/vehiculo.controller.js";

import { isAdmin, isModerator, verifyToken } from "../middlewares/authJwt.js";

const router = Router();

router.post("/", [verifyToken, isAdmin, isModerator], createVehiculo);

router.put("/:id", [verifyToken, isAdmin, isModerator], updateVehiculo);

router.get("/", getVehiculos);

router.get("/:id", getVehiculoById);

router.delete("/:id", [verifyToken, isAdmin, isModerator], deleteVehiculo);

export default router;
