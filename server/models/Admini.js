module.exports = (sequelize, DataTypes) => {

    const Admini = sequelize.define("Admini", {
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
        tableName: 'Admini'
    })

    return Admini

}