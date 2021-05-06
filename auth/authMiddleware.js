require("dotenv").config();
const jwt = require("jsonwebtoken");

// user authentication, verifying JWT token present or not
// if user is logged in or signed up, then it will be present
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = requireAuth;
