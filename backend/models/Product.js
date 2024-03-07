const db = require('../db/conn')


const {DataTypes, Sequelize} =require('sequelize')

const User = require("./User")

const Product = db.define("Produt",{

    id : {
        type :DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false
    },

    name : {
        type:DataTypes.STRING,
        allowNull : false

    },
    price: {
        type:DataTypes.DOUBLE,
        allowNull : false
    },
    file : {
        type:DataTypes.STRING,
        allowNull :false

    }
    


},{tableName : "Produt"})
User.hasMany(Product,{
    foreignKey : {
        allowNull :false,
    
    },onDelete :'Cascade'
}
 )
Product.belongsTo(User
  )

module.exports = Product