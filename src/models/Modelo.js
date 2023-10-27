import mongoose from "mongoose";

const modeloSchema = new mongoose.Schema(
  {
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
