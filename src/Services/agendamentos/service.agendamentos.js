import createError from '../../Utils/createError.js';
import agendamentosRepository from '../../Repositories/agendamentos/repository.agendamentos.js';
import petRepository from '../../Repositories/pets/repository.pet.js';

export default {
    async createAgendamento(tipo, dataMarcada, pet, status) {
        try {
            if (!tipo || !dataMarcada || !pet) {
                throw createError('Todos os campos obrigatórios são necessários.', 400);
            }
            const novoAgendamento = await agendamentosRepository.createAgendamento({
                tipo,
                dataMarcada,
                pet,
                status
            });

            return novoAgendamento;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao cadastrar agendamento.', 400);
        }
    },

    async listAgendamentos() {
        try {
            return await agendamentosRepository.listAgendamentos();
        } catch (error) {
            throw createError('Erro ao listar agendamentos.', 400);
        }
    },

    async listAgendamentosByProfile(tutor) {
        try {
            if (!tutor) {
                throw createError('O ID do usuário é obrigatório.', 400);
            }

            const pets = await petRepository.listPetsByIdProfile(tutor);
            const petIds = pets.map((pet) => pet._id);

            if (petIds.length === 0) {
                return [];
            }

            return await agendamentosRepository.listAgendamentosByPetIds(petIds);
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao listar agendamentos do perfil.', 400);
        }
    },

    async findAgendamentoById(id) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório.', 400);
            }

            const agendamento = await agendamentosRepository.findAgendamentoById(id);
            if (!agendamento) {
                throw createError('Agendamento não encontrado.', 404);
            }

            return agendamento;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao buscar agendamento.', 400);
        }
    },

    async updateAgendamento(id, tipo, dataMarcada, pet, status) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório.', 400);
            }

            const dadosAtualizados = {};
            if (tipo) dadosAtualizados.tipo = tipo;
            if (dataMarcada) dadosAtualizados.dataMarcada = dataMarcada;
            if (pet) dadosAtualizados.pet = pet;
            if (status) dadosAtualizados.status = status;

            const agendamentoUpdated = await agendamentosRepository.updateAgendamento(id, dadosAtualizados);
            if (!agendamentoUpdated) {
                throw createError('Agendamento não encontrado.', 404);
            }

            return agendamentoUpdated;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao atualizar agendamento.', 400);
        }
    },

    async deleteAgendamento(id) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório.', 400);
            }

            const agendamentoDeleted = await agendamentosRepository.deleteAgendamento(id);
            if (!agendamentoDeleted) {
                throw createError('Agendamento não encontrado.', 404);
            }

            return agendamentoDeleted;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao cancelar agendamento.', 400);
        }
    }
};
