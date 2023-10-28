import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema(
  {
    //informacion principal
    modelo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Modelo",
    },
    nombre: {
      type: String,
      required: true,
    },
    descripcion: String,
    imagen_principal: String,
    precio: {
      type: Number,
      default: 0,
    },

    //detalles del vehiculo
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
        velocidad_maxima: String,
        aceleracion_0_100: String,
      },
      seguridad: {
        Airbags: Number,
        Frenos_Antibloqueo_ABC: String,
        Control_traccion: String,
        Control_estabilidad: String,
        Sistema_retencion_infantil: String,
      },
      equipamiento: {
        Sistema_navegacion: String,
        Sistema_sonido_premium: String,
        Asiento_cuero: String,
        Techo_solar: String,
        Conectividad_bluetooth: String,
      },
    },
    //banner de la pagina principal
    caracteristicas: {
      one: {
        titulo: String,
        subtitulo: String,
      },
      two: {
        titulo: String,
        subtitulo: String,
      },
      tree: {
        titulo: String,
        subtitulo: String,
      },
      four: {
        titulo: String,
        subtitulo: String,
      },
    },
    isDestacado: {
      type: Boolean,
      default: false,
    },
    isBanner: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Vehiculo", vehiculoSchema);
