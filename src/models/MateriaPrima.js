const { Model, DataTypes} = require('sequelize')

class mat_prima extends Model {
    static init (connection) {
        super.init({
            codigo: DataTypes.STRING(4),
            ncm: DataTypes.STRING(8),
            cfop: DataTypes.STRING(4),
            sct: DataTypes.STRING(3),
            descricao: DataTypes.STRING,
            unid_medida: DataTypes.STRING(2),
            tipo: DataTypes.STRING(10),
            valor_compra: DataTypes.NUMBER, //integer or decimal
            valor_venda: DataTypes.NUMBER,
            quantidade: DataTypes.INTEGER

        }, {
            sequelize: connection
        })
    }

    static associate (models) {
        this.belongsToMany(models.produto_final, {as:'pf', through: "listas"})
    }

    static associate (models) {
        this.belongsToMany(models.req_compra, {as:'rc', through: "requisitions"})
    }
}

module.exports = mat_prima