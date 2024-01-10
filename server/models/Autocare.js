module.exports = (sequelize, DataTypes) => {

    const Autocare = sequelize.define("Autocare", {
        numar_inmatriculare: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numar_locuri: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'Autocare'
    })

    Autocare.associate = (models) => {
        Autocare.hasMany(models.Curse, {
            as: 'curse',
            foreignKey: 'AutocarID',
            onDelete: "CASCADE"
        })
    }

    return Autocare

}