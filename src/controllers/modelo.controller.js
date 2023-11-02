import Modelo from "../models/Modelo.js";
import Marca from "../models/Marca.js";
import Vehiculo from "../models/Vehiculo.js";
// Controlador para crear un nuevo registro
export const crearModelo = async (req, res) => {
  try {
    const { marcaId, nombre } = req.body;

    const marcaFound = await Marca.findById(marcaId);

    if (!marcaFound) {
      return res.status(400).json({ error: "Esta marca no existe" });
    }

    const nuevoModelo = new Modelo({
      marca: marcaFound._id,
      nombre,
    });

    const modeloGuardado = await nuevoModelo.save();

    const resModelo = await Modelo.findById(modeloGuardado._id).populate(
      "marca"
    );

    res.status(201).json(resModelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los registros
export const obtenerModelos = async (req, res) => {
  try {
    const modelos = await Modelo.find().populate("marca");
    res.json(modelos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un registro por su ID
export const obtenerModeloPorId = async (req, res) => {
  try {
    const modelo = await Modelo.findById(req.params.id).populate("marca");
    if (!modelo) {
      return res.status(404).json({ error: "Modelo no encontrado" });
    }
    res.json(modelo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un registro por su ID
export const eliminarModelo = async (req, res) => {
  try {
    const modelo = await Modelo.findById(req.params.id);
    if (!modelo) {
      return res.status(404).json({ error: "Modelo no encontrado" });
    }

    // Encuentra y recopila los IDs de los vehículos asociados al modelo
    const vehiculos = await Vehiculo.find({ modelo: modelo._id });
    const vehiculosIDs = vehiculos.map((vehiculo) => vehiculo._id);

    // Elimina los vehículos asociados al modelo
    for (const vehiculo of vehiculos) {
      await Vehiculo.findByIdAndRemove(vehiculo._id);
    }

    // Finalmente, elimina el modelo
    await Modelo.findByIdAndRemove(req.params.id);

    res.json({
      _id: modelo._id,
      vehiculosEliminados: vehiculosIDs,
      mensaje: "Modelo y sus vehículos asociados eliminados exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
