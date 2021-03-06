const dbConnection = require("../dataBase/connectionConfig");

module.exports = async (sql) => {
    try {
        const success = await dbConnection.query(sql)
        return {
            status: 200,
            res: { ...success }
        }
    } catch (erro) {
        return {
            status: 400,
            res: { ...erro }
        }
    }
}
