const { Model, DataTypes} = require('sequelize')

class req_compra extends Model {
    static init (connection) {
        super.init({
            codigo: DataTypes.STRING(4),
            descricao: DataTypes.STRING,
            tipo: DataTypes.STRING(10),
            valor_compra: DataTypes.NUMBER, //integer or decimal
            valor_venda: DataTypes.NUMBER,
            quantidade: DataTypes.INTEGER

        }, {
            sequelize: connection
        })
    }
    static associate (models) {
        this.hasMany(models.mat_prima, {as:'matp', through: "requisitions"})
    }

    static associate (models) {
        this.belongsTo(models.produto_final, {as:'prodf', through: "requisitions"})
    }

}

module.exports = req_compra