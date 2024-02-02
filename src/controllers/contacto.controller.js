import Contacto from "../models/Contacto.js";

// Operación CRUD: Crear un nuevo contacto
export const crearContacto = async (req, res) => {
  try {
    const nuevoContacto = new Contacto(req.body);
    const contactoGuardado = await nuevoContacto.save();

    const rescontacto = await Contacto.findById(contactoGuardado._id).populate(
      "user",
      {
        password: 0,
      }
    );

    res.status(201).json(rescontacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Operación CRUD: Obtener todos los contactos
export const obtenerContactos = async (req, res) => {
  try {
    const contactos = await Contacto.find().populate("user", {
      password: 0,
    });
    console.log(contactos);
    res.status(200).json(contactos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Operación CRUD: Obtener un contacto por su ID
export const obtenerContactoPorId = async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id)
      .populate("user", {
        password: 0,
      })
      .populate({
        path: "modelo",
        populate: {
          path: "modelo",
          populate: {
            path: "marca",
          },
        },
      });

    if (!contacto) {
      return res.status(404).json({ mensaje: "Contacto no encontrado" });
    }
    res.status(200).json(contacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Operación CRUD: Actualizar un contacto por su ID
export const actualizarContacto = async (req, res) => {
  try {
    const contacto = await Contacto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!contacto) {
      return res.status(404).json({ mensaje: "Contacto no encontrado" });
    }
    res.status(200).json(contacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Operación CRUD: Eliminar un contacto por su ID
export const eliminarContacto = async (req, res) => {
  try {
    const contacto = await Contacto.findByIdAndRemove(req.params.id);
    if (!contacto) {
      return res.status(404).json({ mensaje: "Contacto no encontrado" });
    }

    console.log(contacto);

    res.json({ _id: contacto._id, mensaje: "Contacto eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para establecer el campo isAtendido de un contacto
export const setAtendido = async (req, res) => {
  try {
    const { userId, isAtendido } = req.body;

    console.log(req.body);

    const contacto = await Contacto.findByIdAndUpdate(
      req.params.id,
      { isAtendido, user: userId },
      { new: true }
    );

    if (!contacto) {
      return res.status(404).json({ mensaje: "Contacto no encontrado" });
    }

    const rescontacto = await Contacto.findById(contacto._id)
      .populate("user", {
        password: 0,
      })
      .populate({
        path: "modelo",
        populate: {
          path: "modelo",
          populate: {
            path: "marca",
          },
        },
      });

    res.status(200).json(rescontacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
