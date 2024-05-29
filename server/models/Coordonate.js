module.exports = (sequelize, DataTypes) => {

    const Coordonate = sequelize.define("Coordonate", {
        latitudine: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false
        },
        longitudine: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false
        },
        timp: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'Coordonate'
    })

    Coordonate.associate = (models) => {
        Coordonate.belongsTo(models.Curse, {
            as: 'cursa',
            foreignKey: 'CursaID',
            onDelete: "NO ACTION"
        })
    }

    return Coordonate

}