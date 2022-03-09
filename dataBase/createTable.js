const dbConnection = require("./connectionConfig");

//Responsável por criar a table no banco de dados
module.exports = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS clientes (
        id serial NOT NULL,
        cpf bigint NOT NULL,
        nome varchar(50) NOT NULL,
        email varchar(50) NOT NULL
    );`

    dbConnection.query(sql, (erro) => {
        erro ? console.log(erro) : console.log(`Tabela criada \n----------------------------- `);
    })
}