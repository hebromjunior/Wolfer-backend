const { Model, DataTypes} = require('sequelize')

class req_compra extends Model {
    static init (connection) {
        super.init({
            codigo: DataTypes.STRING(4),
            descricao: DataTypes.STRING,
            tipo: DataTypes.STRING(10),
            valor_compra: DataTypes.INTEGER, //integer or decimal
            valor_venda: DataTypes.INTEGER,
            quantidade: DataTypes.INTEGER

        }, {
            sequelize: connection
        })
    }
    static associate (models) {

        this.belongsToMany(models.mat_prima, {as:'matp', through: "requisitions"})
        this.belongsTo(models.produto_final)
    }

    

}

module.exports = req_compra