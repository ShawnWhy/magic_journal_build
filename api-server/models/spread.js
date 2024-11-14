// const { Sequelize } = require(".");

module.exports = function(sequelize, DataTypes) {
  var Spread = sequelize.define("Spread", {
    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    
    },
    SpreadType:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    Date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
    Cards: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });
  return Spread
}

// addressId: {
//   type: DataTypes.INTEGER,
//   references: {
//       model: 'addresses',
//       key: 'id'
//   }
// }