module.exports = (sequelize, DataTypes) => {

    const Pasageri = sequelize.define("Pasageri", {
        nume: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parola: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telefon: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Pasageri'
    })

    Pasageri.associate = (models) => {
        Pasageri.hasMany(models.Rezervari, {
            foreignKey: 'PasagerID',
            as: 'rezervari',
            onDelete: "SET NULL"
        });
    }

    return Pasageri

}