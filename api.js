const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const Role = db.role;

// Configuration CORS
app.use(cors());

// Middleware pour analyser les corps de requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importation des routes
const medicamentRoutes = require('./routes/medicament.routes');
const boardRoutes = require('./routes/board.routes');
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// Utilisation des routes dans l'application med
app.use('/', medicamentRoutes);
app.use('/api/board', boardRoutes);

// Utiliser les routes de redirection
/*const redirectRoutes = require('./routes/redirect.routes'); 
app.use('/redirect', redirectRoutes);*/


// Route de base
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// Route pour les utilisateurs (si vous utilisez un moteur de templates comme EJS)
app.get('/users', (req, res) => {
  res.render('users'); // Assurez-vous que le fichier 'users.ejs' ou autre template existe
});

 
// Initialisation des données de base
const initial = async () => {
  await Role.upsert({ id: 1, name: "user" });
  await Role.upsert({ id: 2, name: "moderator" });
  await Role.upsert({ id: 3, name: "admin" });
};
db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
  initial(); // Initialisation des données de base
});

db.sequelize.sync({ alter: true }).then(() => {
  console.log('Database synchronized');
  initial(); // Initialisation des données de base
}).catch(err => {
  console.error('Database synchronization error:', err);
});




// Démarrer le serveur
app.listen(3333, () => {
  console.log('Server is listening on port 3333');
});
