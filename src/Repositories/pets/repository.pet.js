import MPet from '../../Models/pet.schema.js';

export default {
    async createPet(petData) {
        return await MPet.create(petData);
    },

    async listPets() {
        return await MPet.find({ ativo: true });
    },

    async findPetById(id) {
        return await MPet.findOne({ _id: id, ativo: true });
    },

    async updatePet(id, dadosAtualizados) {
        return await MPet.findByIdAndUpdate(id, dadosAtualizados, { new: true });
    },

    async deletePet(id) {
        return await MPet.findByIdAndUpdate(id, { ativo: false }, { new: true });
    },

    async listPetsByIdProfile(tutor) {
        return await MPet.find({ tutor, ativo: true });
    },

    async findPetByIdAndTutor(id, tutor) {
        return await MPet.findOne({ _id: id, tutor, ativo: true });
    }
};
