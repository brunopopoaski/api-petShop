import createError from '../../Utils/createError.js';
import racaRepository from '../../Repositories/raca/repository.raca.js';

export default {
    async createRaca(especie, nome) {
        try {
            if (!especie || !nome) {
                throw createError('Todos os campos obrigatórios são necessários.', 400);
            }

            const novaRaca = await racaRepository.createRaca({
                especie,
                nome
            });

            return novaRaca;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao cadastrar tipo de pet.', 400);
        }
    },

    async listRacas() {
        try {
            return await racaRepository.listRacas();
        } catch (error) {
            throw createError('Erro ao listar tipos de pet.', 400);
        }
    }
};
