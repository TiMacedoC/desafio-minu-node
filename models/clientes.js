const sqlHandle = require('./sqlHandle');
const cpfHandle = require('./cpfHandle')

class Clientes {

    async post(cliente) {
        const { cpf, nome, email } = cliente;

        //Verifica se os três campos foram preenchidos
        if (cpf && nome && email) {

            const isCpfValid = cpfHandle(cpf);

            if (isCpfValid.status == 200) {

                const sql = `INSERT INTO clientes(cpf, nome, email)
                VALUES('${cpf}','${nome}', '${email}');`

                const resposta = await sqlHandle(sql);

                resposta.status = 201;

                return resposta;


            } else {
                return isCpfValid
            }

        } else {
            return { status: 400, message: "Dados incorretos ou inexistentes" };
        }

    }

    async getAll() {
        const sql = `SELECT * FROM clientes;`

        const resposta = await sqlHandle(sql);
        return resposta.res.rows
    }

    async getById(id) {
        const allClients = await this.getAll()
        const resposta = allClients.find(client => client.id == id)
        return resposta;
    }

    async update(id, values) {
        const getClient = await this.getById(id)

        if (getClient) {
            //Cria a string
            let changes = '';
            for (let prop in values) {

                //Verifica se tem algum campo vazio
                if (!values[prop]) {
                    return { status: 400, message: "Dados incorretos ou inexistentes" };
                }

                if (prop == "cpf") {
                    const isCpfValid = cpfHandle(values[prop])
                    if (isCpfValid.status == 400) {
                        return isCpfValid
                    }
                }

                changes += `${prop} = '${values[prop]}',`
            }
            changes = changes.slice(0, -1);

            const sql = `
                    UPDATE clientes
                    SET ${changes}
                    WHERE id = ${id}
                ;`

            const resposta = await sqlHandle(sql)
            return resposta
        } else {
            return { status: 400, error: "Cliente não encontrado" };
        }

    }

    async delete(id) {

        const cliente = await this.getById(id)

        if (cliente) {
            const sql = `DELETE FROM clientes WHERE id = ${id};`
            const resposta = await sqlHandle(sql)
            return resposta
        } else {
            return { status: 400, error: "Cliente não encontrado" }
        }


    }
}


module.exports = new Clientes();