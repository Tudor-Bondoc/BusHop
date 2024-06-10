module.exports = (sequelize, DataTypes) => {

    const Soferi = sequelize.define("Soferi", {
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
        }
    }, {
        tableName: 'Soferi'
    })

    Soferi.associate = (models) => {
        Soferi.hasMany(models.Curse, {
            as: 'curse',
            foreignKey: 'SoferID',
            onDelete: "CASCADE"
        })
    }

    return Soferi

}