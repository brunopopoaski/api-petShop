import petService from '../../Services/pets/service.pet.js';
import racaService from '../../Services/raca/service.raca.js';

export default {
    async createPet(req, res, next) {
        try {
            const { nome, especie, raca, sexo, dataNascimento, idade, peso, cor, porte, castrado, observacoes, tutor } = req.body;
            const novoPet = await petService.createPet(nome, especie, raca, sexo, dataNascimento, idade, peso, cor, porte, castrado, observacoes, tutor);
            res.status(201).json(novoPet);
        } catch (error) {
            next(error);
        }
    },

    async listPets(req, res, next) {
        try {
            const pets = await petService.listPets();
            res.status(200).json(pets);
        } catch (error) {
            next(error);
        }
    },

    async findPetById(req, res, next) {
        try {
            const { id } = req.params;
            const pet = await petService.findPetById(id);
            res.status(200).json(pet);
        } catch (error) {
            next(error);
        }
    },

    async updatePet(req, res, next) {
        try {
            const { id } = req.params;
            const { nome, especie, raca, sexo, dataNascimento, idade, peso, cor, porte, castrado, observacoes, ativo } = req.body;
            const petUpdated = await petService.updatePet(id, nome, especie, raca, sexo, dataNascimento, idade, peso, cor, porte, castrado, observacoes, ativo);
            res.status(200).json(petUpdated);
        } catch (error) {
            next(error);
        }
    },

    async deletePet(req, res, next) {
        try {
            const { id } = req.params;
            const petDeleted = await petService.deletePet(id);
            res.status(200).json(petDeleted);
        } catch (error) {
            next(error);
        }
    },

    async createTypePet(req, res, next) {
        try {
            const { especie, nome } = req.body;
            const novaRaca = await racaService.createRaca(especie, nome);
            res.status(201).json(novaRaca);
        } catch (error) {
            next(error);
        }
    },

    async listPetsByIdProfile(req, res, next) {
        try {
            const tutor = req.user.id;
            const pets = await petService.listPetsByIdProfile(tutor);
            res.status(200).json(pets);
        } catch (error) {
            next(error);
        }
    },

    async findPetByIdProfile(req, res, next) {
        try {
            const tutor = req.user.id;
            const { petId } = req.params;
            const pet = await petService.findPetByIdProfile(tutor, petId);
            res.status(200).json(pet);
        } catch (error) {
            next(error);
        }
    }
};
