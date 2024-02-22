module.exports = (sequelize, DataTypes) => {

    const Rezervari = sequelize.define("Rezervari", {
        loc: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        nume: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Rezervari'
    })

    Rezervari.associate = (models) => {
        Rezervari.belongsTo(models.Curse, {
            as: 'cursa',
            foreignKey: 'CursaID',
            onDelete: "NO ACTION"
        });
    }

    return Rezervari

}