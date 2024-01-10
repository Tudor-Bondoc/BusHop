module.exports = (sequelize, DataTypes) => {

    const Rezervari = sequelize.define("Rezervari", {
        loc: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    }, {
        tableName: 'Rezervari'
    })

    Rezervari.associate = (models) => {
        Rezervari.belongsTo(models.Pasageri, {
            as: 'pasager',
            foreignKey: 'PasagerID',
            onDelete: "NO ACTION"
        });
        Rezervari.belongsTo(models.Curse, {
            as: 'cursa',
            foreignKey: 'CursaID',
            onDelete: "NO ACTION"
        });
    }

    return Rezervari

}