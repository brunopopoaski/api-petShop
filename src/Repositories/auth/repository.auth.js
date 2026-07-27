import  MUser  from '../../Models/user.schema.js'

export default {
    async findByCpf(cpf) {
        return await MUser.findOne({cpf})
    }
}