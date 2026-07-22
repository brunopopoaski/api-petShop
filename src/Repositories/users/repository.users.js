import { MUser, MEndereco } from '../../models/user.schema.js'

export default {
    async findByCpf(cpf) {
        return await MUser.findOne({cpf})
    }
}