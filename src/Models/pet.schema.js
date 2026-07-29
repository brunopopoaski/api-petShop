import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },

    especie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    raca: {
      type: String,
      required: true
    },

    sexo: {
      type: String,
      enum: ["Macho", "Fêmea"]
    },

    dataNascimento: {
      type: Date
    },

    idade: {
      type: Number,
      min: 0
    },

    peso: {
      type: Number,
      min: 0
    },

    cor: {
      type: String
    },

    porte: {
      type: String,
      enum: ["Pequeno", "Médio", "Grande"]
    },

    castrado: {
      type: Boolean,
      default: false
    },

    observacoes: {
      type: String,
      maxlength: 1000
    },

    ativo: {
      type: Boolean,
      default: true
    },

    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const MPet = mongoose.model('pets', petSchema);

export default MPet;