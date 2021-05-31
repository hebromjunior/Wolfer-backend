const { Model, DataTypes} = require('sequelize')

class produto_final extends Model {
    static init (connection) {
        super.init({
            codigo: DataTypes.STRING(4),
            ncm: DataTypes.STRING(8),
            cfop: DataTypes.STRING(4),
            sct: DataTypes.STRING(3),
            descricao: DataTypes.TEXT,
            tipo: DataTypes.STRING,
            valor_compra: DataTypes.DECIMAL,
            valor_venda: DataTypes.DECIMAL,
            quantidade: DataTypes.INTEGER,
        },{
            sequelize: connection
        })
    }

    static associate(models) {
        this.belongsToMany(models.mat_prima, {as:'mp',through: "listas"})
    }

}

module.exports = produto_final

