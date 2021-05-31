const dbConfig = require('../config/database')
const Sequelize = require('sequelize');

const MateriaPrima = require('./MateriaPrima')
const ProdutoFinal = require('./ProdutoFinal')
const ReqCompra = require('./ReqCompra')


const connection = new Sequelize(dbConfig)

MateriaPrima.init(connection)
ProdutoFinal.init(connection)
ReqCompra.init(connection)


MateriaPrima.associate(connection.models)
ProdutoFinal.associate(connection.models)
ReqCompra.associate(connection.models)

//connection.sync()
module.exports = connection;
