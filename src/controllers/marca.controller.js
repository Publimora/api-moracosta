import Marca from "../models/Marca.js";
// Controlador para crear un nuevo registro
export const crearMarca = async (req, res) => {
  try {
    const nuevoMarca = new Marca(req.body);
    const marcaGuardado = await nuevoMarca.save();
    res.status(201).json(marcaGuardado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los registros
export const obtenerMarcas = async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un registro por su ID
export const obtenerMarcaPorId = async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    if (!marca) {
      return res.status(404).json({ error: "Marca no encontrado" });
    }
    res.json(marca);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un registro por su ID
export const eliminarMarca = async (req, res) => {
  try {
    const marca = await Marca.findByIdAndRemove(req.params.id);
    if (!marca) {
      return res.status(404).json({ error: "Marca no encontrado" });
    }
    res.json({ _id: marca._id, mensaje: "Marca eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
