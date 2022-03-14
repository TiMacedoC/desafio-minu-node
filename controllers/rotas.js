const Clientes = require('../models/clientes');

module.exports = (app) => {
    app.post('/clientes', async (req, res) => {
        const resposta = await Clientes.post(req.body);
        res.status(resposta.status).json(resposta)
    })

    app.get('/clientes', async (req, res) => {
        const resposta = await Clientes.getAll();
        resposta.length == 0 ? res.status(204).send() : res.status(200).json(resposta)
    })

    app.get('/clientes/:id', async (req, res) => {
        const { id } = req.params;
        const resposta = await Clientes.getById(id);
        resposta ? res.json(resposta) : res.json({ client: false, error: "Id não encontrado" })
    })

    app.delete('/clientes/:id', async (req, res) => {
        const { id } = req.params;
        const resposta = await Clientes.delete(id);

        res.status(resposta.status).json(resposta)
    })

    app.patch('/clientes/:id', async (req, res) => {
        const { id } = req.params;
        const changes = req.body;
        const resposta = await Clientes.update(id, changes);

        res.status(resposta.status).json(resposta)
    })
}

