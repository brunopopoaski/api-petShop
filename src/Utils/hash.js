import bcrypt from 'bcrypt';
import env from '../config/env.js';

export default {

  createHashSenha(senha) {
    return bcrypt.hashSync(senha, env.SALT_ROUNDS);
  },

  compareHashSenha(senha, hashSenha) {
  return bcrypt.compareSync(senha, hashSenha);
}
}
