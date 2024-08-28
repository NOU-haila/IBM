const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect, 
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Charger les modèles
db.role = require("../models/role.models.js")(sequelize, Sequelize);
db.user = require("../models/user.models.js")(sequelize, Sequelize);
db.medicament = require('../models/medicament.models.js')(sequelize, Sequelize);
//db.User = require('./user.models');


// Définir les relations (si nécessaire)
db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
