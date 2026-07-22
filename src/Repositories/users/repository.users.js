import {Muser, MEndereco} from '../../models/user.model.js'

export default {
    async findByCpf(cpf) {
        return await MUser.findOne({cpf})
    }
}