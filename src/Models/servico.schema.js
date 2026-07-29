import mongoose from 'mongoose';

const servicoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true
    },

    descricao: {
      type: String,
      required: true,
      trim: true
    },

    preco: {
      type: Number,
      required: true,
      min: 0
    },

    duracao: {
      type: Number,
      required: true,
      min: 0
    },

    ativo: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const MServico = mongoose.model('servicos', servicoSchema);

export default MServico;
