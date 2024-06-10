module.exports = (sequelize, DataTypes) => {

    const Curse = sequelize.define("Curse", {
        zi_plecare: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ora_plecare: {
            type: DataTypes.TIME,
            allowNull: false
        },
        ora_sosire: {
            type: DataTypes.TIME,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Curse'
    })

    Curse.associate = (models) => {
        Curse.belongsTo(models.Trasee, {
            as: 'traseu',
            foreignKey: 'TraseuID',
            onDelete: "NO ACTION"
        });
        Curse.belongsTo(models.Soferi, {
            as: 'sofer',
            foreignKey: 'SoferID',
            onDelete: "NO ACTION"
        });
        Curse.belongsTo(models.Autocare, {
            as: 'autocar',
            foreignKey: 'AutocarID',
            onDelete: "NO ACTION"
        });
        Curse.hasMany(models.Rezervari, {
            as: 'rezervari',
            foreignKey: 'CursaID',
            onDelete: "CASCADE"
        });
        Curse.hasMany(models.Coordonate, {
            as: 'coordonate',
            foreignKey: 'CursaID',
            onDelete: "CASCADE"
        })
    }

    return Curse

}