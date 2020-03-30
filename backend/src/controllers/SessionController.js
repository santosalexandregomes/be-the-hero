const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await connection('ongs').where('id', id).select('nome').first();

        if(!ong){
            return response.status(400).json({ error: "Não exixte ONG com este ID."});
        }

        return response.json(ong);
    }
}