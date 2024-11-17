// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Reading = sequelize.define("Reading", {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    SpreadId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    }, 
    SpreadType:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    ReaderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ReaderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SeekerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SeekerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Symbols: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },  
    ReadingText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
      
  });
  return Reading
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }