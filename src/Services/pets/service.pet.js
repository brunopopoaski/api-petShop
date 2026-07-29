import createError from '../../Utils/createError.js';
import petRepository from '../../Repositories/pets/repository.pet.js';

export default {
    async createPet(nome, especie, raca, sexo, dataNascimento, idade, peso, cor, porte, castrado, observacoes, tutor) {
        try {
            if (!nome || !especie || !raca || !tutor) {
                throw createError('Todos os campos obrigatórios são necessários.', 400);
            }

            const novoPet = await petRepository.createPet({
                nome,
                especie,
                raca,
                sexo,
                dataNascimento,
                idade,
                peso,
                cor,
                porte,
                castrado,
                observacoes,
                tutor
            });

            return novoPet;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao cadastrar pet.', 400);
        }
    },

    async listPets() {
        try {
            return await petRepository.listPets();
        } catch (error) {
            throw createError('Erro ao listar pets.', 400);
        }
    },

    async findPetById(id) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório.', 400);
            }

            const pet = await petRepository.findPetById(id);
            if (!pet) {
                throw createError('Pet não encontrado.', 404);
            }

            return pet;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao buscar pet.', 400);
        }
    },

    async updatePet(id, nome, especie, raca, sexo, dataNascimento, idade, peso, cor, porte, castrado, observacoes, ativo) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório.', 400);
            }

            const dadosAtualizados = {};
            if (nome) dadosAtualizados.nome = nome;
            if (especie) dadosAtualizados.especie = especie;
            if (raca) dadosAtualizados.raca = raca;
            if (sexo) dadosAtualizados.sexo = sexo;
            if (dataNascimento) dadosAtualizados.dataNascimento = dataNascimento;
            if (idade !== undefined) dadosAtualizados.idade = idade;
            if (peso !== undefined) dadosAtualizados.peso = peso;
            if (cor) dadosAtualizados.cor = cor;
            if (porte) dadosAtualizados.porte = porte;
            if (castrado !== undefined) dadosAtualizados.castrado = castrado;
            if (observacoes) dadosAtualizados.observacoes = observacoes;
            if (ativo !== undefined) dadosAtualizados.ativo = ativo;

            const petUpdated = await petRepository.updatePet(id, dadosAtualizados);
            if (!petUpdated) {
                throw createError('Pet não encontrado.', 404);
            }

            return petUpdated;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao atualizar pet.', 400);
        }
    },

    async deletePet(id) {
        try {
            if (!id) {
                throw createError('O ID é obrigatório.', 400);
            }

            const petDeleted = await petRepository.deletePet(id);
            if (!petDeleted) {
                throw createError('Pet não encontrado.', 404);
            }

            return petDeleted;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao inativar pet.', 400);
        }
    },

    async listPetsByIdProfile(tutor) {
        try {
            if (!tutor) {
                throw createError('O tutor é obrigatório.', 400);
            }
            return await petRepository.listPetsByIdProfile(tutor);
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao listar pets do perfil.', 400);
        }
    },

    async findPetByIdProfile(tutor, petId) {
        try {
            if (!tutor) {
                throw createError('O tutor é obrigatório.', 400);
            }
            if (!petId) {
                throw createError('O ID do pet é obrigatório.', 400);
            }

            const pet = await petRepository.findPetByIdAndTutor(petId, tutor);
            if (!pet) {
                throw createError('Pet não encontrado.', 404);
            }

            return pet;
        } catch (error) {
            if (error.statusCode) throw error;
            throw createError('Erro ao buscar pet do perfil.', 400);
        }
    }
};
