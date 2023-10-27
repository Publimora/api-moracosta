import mongoose from "mongoose";

const modeloSchema = new mongoose.Schema(
  {
    marca: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Marca",
    },
    nombre: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Modelo", modeloSchema);
