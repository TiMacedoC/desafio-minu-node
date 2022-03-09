const customExpress = require('./config/customExpress')
const rotas = require('./controllers/rotas')
const dbConnection = require('./dataBase/connectionConfig')
const createTable = require('./dataBase/createTable')

const app = customExpress()

//Se conecta ao banco de dados, depois disso sobe o servidor
dbConnection.connect(error => {

    if (error) {
        console.log("ERRO ao conectar ao banco de dados", error)
    } else {
        createTable()

        app.listen(3000, () => console.log("Rodando na porta 3000"))

        rotas(app)
    }
})