import mongoose from "mongoose";

const agendamentoSchema = new mongoose.Schema(
  {

    pet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    tipo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    dataMarcada: {
      type: Date,
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

const MAgendamento = mongoose.model('agendamentos', agendamentoSchema);

export default MAgendamento;