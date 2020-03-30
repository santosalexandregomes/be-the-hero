const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        //Com paginação
        const { page = 1 } = request.query; //Caso não exista o valor sera 1.

        const [count] = await connection('incidents').count(); //Dentro do Colchete pois retornara um array, logo assim trata apenas a posição 0.

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page -1 ) * 5)//Pular de 5 em 5 registros
        .select([
        'incidents.*', 
        'ongs.nome', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']); //Enviando a quant total dos registros via heade para não ficar junto aos dados dos casos.

        return response.json({ incidents });
    },

    async create(request, response) {
        const {titulo, descriptions, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            titulo,
            descriptions,
            value,
            ong_id,
        });

        return response.json({ id }); // Retornar o id do caso castrado
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;


        const incidents = await connection('incidents').where('id', id).select('ong_id').first(); //selecionar o id da ong que se deseja deletar o caso

        if(incidents.ong_id !== ong_id){ //Verificar se a ong que esta deletando e a mesma do caso a ser deletado
            return response.status(401).json({ error: 'Operação não permitida!' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //Resposta de sucesso sem exibir mensagem alguma
    }
};