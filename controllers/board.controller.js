exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.redirect('/users'); // Redirection vers la page /users
  };
  
  exports.adminBoard = (req, res) => {
    res.redirect('/Admin');
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  