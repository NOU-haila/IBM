const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.status(200).send({ message: "User registered successfully!" }); // Basic success message
          });
        });
      } else {
        user.setRoles([1]).then(() => {
          res.status(200).send({ message: "User registered successfully!" }); // Basic success message
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "There was a problem registering the user." }); // Basic error message
    });
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      expiresIn: 86400, // 24 hours
    });

    const roles = await user.getRoles();
    const authorities = roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user.id,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: "There was a problem signing in." });
  }
};
