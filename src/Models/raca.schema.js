import mongoose from "mongoose";

const racaSchema = new mongoose.Schema(
  {
    especie: {
      type: String,
      required: true
    },
    nome: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true
  }
);

const MRaca = mongoose.model('raca', racaSchema);

export default MRaca;