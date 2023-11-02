import Vehiculo from "../models/Vehiculo.js";
import {
  deleteImage,
  deleteVideo,
  uploadImage,
  uploadVideo,
} from "../utils/cloudinary.js";

// Crear un vehículo
export const createVehiculo = async (req, res) => {
  try {
    let reqvehiculo = req.body;

    const imagen_principal = reqvehiculo.imagen_principal;
    const imagen1 = reqvehiculo.detalles.imagen1;
    const imagen2 = reqvehiculo.detalles.imagen2;
    const imagen_especificaciones = reqvehiculo.imagen_especificaciones;
    const video_banner = reqvehiculo.video_banner;

    const upload_imagen_principal = await uploadImage(
      reqvehiculo.nombre,
      imagen_principal
    );

    const upload_imagen1 = await uploadImage(reqvehiculo.nombre, imagen1);

    const upload_imagen2 = await uploadImage(reqvehiculo.nombre, imagen2);

    const upload_imagen_especificaciones = await uploadImage(
      reqvehiculo.nombre,
      imagen_especificaciones
    );

    const upload_video_banner = await uploadVideo(
      reqvehiculo.nombre,
      video_banner
    );

    reqvehiculo.imagen_principal = {
      public_id: upload_imagen_principal.public_id,
      url: upload_imagen_principal.secure_url,
    };

    reqvehiculo.detalles.imagen1 = {
      public_id: upload_imagen1.public_id,
      url: upload_imagen1.secure_url,
    };

    reqvehiculo.detalles.imagen2 = {
      public_id: upload_imagen2.public_id,
      url: upload_imagen2.secure_url,
    };

    reqvehiculo.imagen_especificaciones = {
      public_id: upload_imagen_especificaciones.public_id,
      url: upload_imagen_especificaciones.secure_url,
    };

    reqvehiculo.video_banner = {
      public_id: upload_video_banner.public_id,
      url: upload_video_banner.secure_url,
    };

    const vehiculo = new Vehiculo(reqvehiculo);
    const savedVehiculo = await vehiculo.save();

    const resVehiculo = await Vehiculo.findById(savedVehiculo._id).populate({
      path: "modelo",
      populate: {
        path: "marca",
      },
    });

    res.status(201).json(resVehiculo);
  } catch (err) {
    console.log(err);
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

    deleteImage(vehiculo.imagen_principal.public_id);
    deleteImage(vehiculo.detalles.imagen1.public_id);
    deleteImage(vehiculo.detalles.imagen2.public_id);
    deleteImage(vehiculo.imagen_especificaciones.public_id);
    deleteVideo(vehiculo.video_banner.public_id);

    res.json({
      _id: vehiculo._id,
      message: "Vehículo eliminado correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar la propiedad isBanner de un vehículo
export const updateIsBanner = async (req, res) => {
  try {
    // Obtiene el vehículo actual con isBanner en true
    const isBanner = req.body.isBanner;
    const vehiculoActual = await Vehiculo.findOne({ isBanner: true });

    if (vehiculoActual) {
      vehiculoActual.isBanner = false;
      await vehiculoActual.save();
    }

    const vehiculo = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { isBanner: isBanner },
      { new: true }
    );

    if (!vehiculo) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    res.json({ vehiculo: vehiculo, anterior: vehiculoActual });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar la propiedad isDestacado de un vehículo por ID
export const updateDestacado = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(
      req.params.id,
      { isDestacado: req.body.isDestacado },
      { new: true }
    );

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

