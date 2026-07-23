import bcrypt from 'bcrypt';

export default function compareHashSenha(senha, hashSenha) {
  return bcrypt.compareSync(senha, hashSenha);
}