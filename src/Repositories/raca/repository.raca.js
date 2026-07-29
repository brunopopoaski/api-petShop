import MRaca from '../../Models/raca.schema.js';

export default {
    async createRaca(racaData) {
        return await MRaca.create(racaData);
    }
};
