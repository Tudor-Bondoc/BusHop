module.exports = (sequelize, DataTypes) => {

    const Trasee = sequelize.define("Trasee", {
        oras_pornire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        oras_1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oras_2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oras_3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        oras_sosire: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Trasee'
    })

    Trasee.associate = (models) => {
        Trasee.hasMany(models.Curse, {
            as: 'curse',
            foreignKey: 'TraseuID',
            onDelete: "CASCADE"
        })
    }

    return Trasee

}