import Vehiculo from "../models/Vehiculo.js";

// Crear un vehículo
export const createVehiculo = async (req, res) => {
  try {
    const vehiculo = new Vehiculo(req.body);
    const savedVehiculo = await vehiculo.save();

    const resVehiculo = await Vehiculo.findById(savedVehiculo._id).populate({
      path: "modelo",
      populate: {
        path: "marca",
      },
    });

    res.status(201).json(resVehiculo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los vehículos
export const getVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().populate({
      path: "modelo",
      populate: {
        path: "marca",
      },
    });
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un vehículo por ID
export const getVehiculoById = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id).populate({
      path: "modelo",
      populate: {
        path: "marca",
      },
    });
    if (!vehiculo) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.json(vehiculo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un vehículo por ID
export const updateVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehiculo) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    const resVehiculo = await Vehiculo.findById(vehiculo._id).populate({
      path: "modelo",
      populate: {
        path: "marca",
      },
    });

    res.json(resVehiculo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un vehículo por ID
export const deleteVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndRemove(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.json({ message: "Vehículo eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
