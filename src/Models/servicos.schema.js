import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    tipo: {
      type: String,
      required: true,
      enum: ["Banho", "Vacina", "Consulta"]
    },

    dataMarcada: {
      type: Date,
      required: true
    },

    pet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    status: {
      type: String,
      enum: [
        "Agendado",
        "Aceito",
        "Finalizado",
        "Cancelado"
      ],
      default: "Agendado"
    }
  },
  {
    timestamps: true
  }
);

const MService = mongoose.model('services', serviceSchema);

export default MService;