import MServico from '../../Models/servico.schema.js';

export default {
    async createServico(servicoData) {
        return await MServico.create(servicoData);
    },

    async listServicos() {
        return await MServico.find();
    }
};
