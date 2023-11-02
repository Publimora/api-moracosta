import { Router } from "express";
import {
  createVehiculo,
  getVehiculos,
  deleteVehiculo,
  getVehiculoById,
  updateVehiculo,
  updateDestacado,
  updateIsBanner,
} from "../controllers/vehiculo.controller.js";

import {
  isAdmin,
  isAdminOrModerator,
  verifyToken,
} from "../middlewares/authJwt.js";

const router = Router();

router.post("/", [verifyToken, isAdminOrModerator], createVehiculo);

router.put("/:id", [verifyToken, isAdminOrModerator], updateVehiculo);

router.get("/", getVehiculos);

router.get("/:id", getVehiculoById);

router.delete("/:id", [verifyToken, isAdminOrModerator], deleteVehiculo);

router.put("/isDestacado/:id", [verifyToken, isAdmin], updateDestacado);

router.put("/isBanner/:id", [verifyToken, isAdmin], updateIsBanner);

export default router;
