const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
  const medicament = sequelize.define('medicament', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING, // Assurez-vous que le type correspond à celui de la base de données
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT, // Utilisez FLOAT ou DECIMAL selon vos besoins
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiration_date: {
      type: DataTypes.DATEONLY, // DATEONLY pour ne stocker que la date
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING, 
      allowNull: true
    }
  }, {
    tableName: 'medicament', 
    timestamps: false 
    
  });

  return medicament;
};
