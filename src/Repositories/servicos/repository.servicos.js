import MServico from '../../Models/servico.schema.js';

export default {
    async listServicos() {
        return await MServico.find();
    }
};
