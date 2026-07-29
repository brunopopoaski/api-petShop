import agendamentosService from '../../Services/agendamentos/service.agendamentos.js';

export default {
    async createAgendamento(req, res, next) {
        try {
            const { tipo, dataMarcada, pet, status } = req.body;
            const novoAgendamento = await agendamentosService.createAgendamento(tipo, dataMarcada, pet, status);
            res.status(201).json(novoAgendamento);
        } catch (error) {
            next(error);
        }
    },

    async listAgendamentos(req, res, next) {
        try {
            const agendamentos = await agendamentosService.listAgendamentos();
            res.status(200).json(agendamentos);
        } catch (error) {
            next(error);
        }
    },

    async listAgendamentosProfile(req, res, next) {
        try {
            const id = req.user.id;
            const agendamentos = await agendamentosService.listAgendamentosByProfile(id);
            res.status(200).json(agendamentos);
        } catch (error) {
            next(error);
        }
    },

    async findAgendamentoById(req, res, next) {
        try {
            const { id } = req.params;
            const agendamento = await agendamentosService.findAgendamentoById(id);
            res.status(200).json(agendamento);
        } catch (error) {
            next(error);
        }
    },

    async updateAgendamento(req, res, next) {
        try {
            const { id } = req.params;
            const { tipo, dataMarcada, pet, status } = req.body;
            const agendamentoUpdated = await agendamentosService.updateAgendamento(id, tipo, dataMarcada, pet, status);
            res.status(200).json(agendamentoUpdated);
        } catch (error) {
            next(error);
        }
    },

    async deleteAgendamento(req, res, next) {
        try {
            const { id } = req.params;
            const agendamentoDeleted = await agendamentosService.deleteAgendamento(id);
            res.status(200).json(agendamentoDeleted);
        } catch (error) {
            next(error);
        }
    }
};
