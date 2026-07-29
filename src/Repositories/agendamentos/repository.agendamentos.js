import MAgendamento from '../../Models/agendamento.schema.js';

export default {
    async createAgendamento(agendamentoData) {
        return await MAgendamento.create(agendamentoData);
    },

    async listAgendamentos() {
        return await MAgendamento.find();
    },

    async findAgendamentoById(id) {
        return await MAgendamento.findById(id);
    },

    async updateAgendamento(id, dadosAtualizados) {
        return await MAgendamento.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    },

    async deleteAgendamento(id) {
        return await MAgendamento.findByIdAndUpdate(id, { status: 'Cancelado' }, { new: true });
    },

    async listAgendamentosByPetIds(petIds) {
        return await MAgendamento.find({ pet: { $in: petIds } });
    },

    async findAgendamentoByIdAndPetIds(id, petIds) {
        return await MAgendamento.findOne({ _id: id, pet: { $in: petIds } });
    }
};
