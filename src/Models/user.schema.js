import mongoose from 'mongoose';

const EnderecoSchema = new mongoose.Schema(
  {
    cep: {
      type: String,
      required: true,
      trim: true,
    },
    rua: {
      type: String,
      required: true,
      trim: true,
    },
    numero: {
      type: String,
      required: true,
      trim: true,
    },
    bairro: {
      type: String,
      required: true,
      trim: true,
    },
    cidade: {
      type: String,
      required: true,
      trim: true,
    },
    estado: {
      type: String,
      required: true,
      uppercase: true,
      minlength: 2,
      maxlength: 2,
    },
  },
  { _id: false }
);


const UserSchema = new mongoose.Schema(
    {
     id: {
      type: String,
      required: true,
      unique: true,
    },

    nomeCompleto: {
      type: String,
      required: true,
      trim: true,
    },

    cpf: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    telefone: {
      type: String,
      required: true,
      trim: true,
    },

    senha: {
      type: String,
      required: true,
      //select: false,
    },

    endereco: {
      type: EnderecoSchema,
      required: true,
    },

    status: {
      type: String,
      enum: ["ATIVO", "INATIVO"],
      default: "ATIVO",
    },

    tipoUsuario: {
      type: Number,
      enum: [1, 33144],
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)




const MUser = mongoose.model('users', UserSchema);
const MEndereco = mongoose.model('enderecos', EnderecoSchema);

export { MUser, MEndereco };