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

router.post("/", [verifyToken, isModerator], createVehiculo);

router.put("/:id", [verifyToken, isModerator], updateVehiculo);

router.get("/", getVehiculos);

router.get("/:id", getVehiculoById);

router.delete("/:id", [verifyToken, isAdmin], deleteVehiculo);

export default router;
