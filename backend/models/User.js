const db = require('../db/conn')


const {DataTypes, Sequelize} =require('sequelize')


const User = db.define("User",{

    id : {
        type :DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true,
        allowNull : false,
        

    },

    name : {
        type:DataTypes.STRING,
        allowNull : false,
    
        

    },
    email: {
        type:DataTypes.STRING,
        allowNull : false,
    
        
    },
    password : {
        type:DataTypes.STRING,
        allowNull : false,
       
        
    }

},{tableName : "User"})

module.exports = User