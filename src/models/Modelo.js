import mongoose from "mongoose";

const modeloSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Modelo", modeloSchema);
