import Marca from "../models/Marca.js";
import Modelo from "../models/Modelo.js";
import Vehiculo from "../models/Vehiculo.js";
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

// Controlador para eliminar una marca y sus modelos y vehículos asociados
export const eliminarMarca = async (req, res) => {
  try {
    const marca = await Marca.findById(req.params.id);
    if (!marca) {
      return res.status(404).json({ error: "Marca no encontrada" });
    }

    let resIdModelos = [];
    let resIdVehiculos = [];
    // Encuentra y elimina los modelos asociados a la marca
    const modelos = await Modelo.find({ marca: marca._id });
    for (const modelo of modelos) {
      resIdModelos.push(modelo._id);
      const vehiculos = await Vehiculo.find({ modelo: modelo._id });
      for (const vehiculo of vehiculos) {
        resIdVehiculos.push(vehiculo._id);
        await Vehiculo.findByIdAndRemove(vehiculo._id);
      }
      await Modelo.findByIdAndRemove(modelo._id);
    }

    // Finalmente, elimina la marca
    await Marca.findByIdAndRemove(req.params.id);

    res.json({
      _id: marca._id,
      modelosEliminados: resIdModelos,
      vehiculosEliminados: resIdVehiculos,
      mensaje:
        "Marca y sus modelos y vehículos asociados eliminados exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
