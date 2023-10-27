import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema(
  {
    modelo_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modelo",
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: String,
    imagen_principal: String,
    precio: {
      type: Number,
      default: 0,
    },
    ficha_tecnica: String,
    video_banner: String,
    detalles_banner: {
      one: String,
      two: String,
      tree: String,
    },
    detalles: {
      titulo1: String,
      texto1: String,
      imagen1: String,
      titulo2: String,
      texto2: String,
      imagen2: String,
    },
    imagen_especificaciones: String,
    especificaciones: {
      potencia: {
        potencia_motor: String,
        torque: String,
      },
      seguridad: {
        Airbags: Number,
        Frenos_Antibloqueo_ABC: String,
      },
      equipamiento: {
        Sistema_navegacion: String,
        Techo_solar: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Vehiculo", vehiculoSchema);
