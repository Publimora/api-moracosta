import Modelo from "../models/Modelo.js";
// Controlador para crear un nuevo registro
export const crearModelo = async (req, res) => {
  try {
    const nuevoModelo = new Modelo(req.body);
    const modeloGuardado = await nuevoModelo.save();
    res.status(201).json(modeloGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los registros
export const obtenerModelos = async (req, res) => {
  try {
    const modelos = await Modelo.find();
    res.json(modelos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un registro por su ID
export const obtenerModeloPorId = async (req, res) => {
  try {
    const modelo = await Modelo.findById(req.params.id);
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
    const modelo = await Modelo.findByIdAndRemove(req.params.id);
    if (!modelo) {
      return res.status(404).json({ error: "Modelo no encontrado" });
    }
    res.json({ _id: modelo._id, mensaje: "Modelo eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
