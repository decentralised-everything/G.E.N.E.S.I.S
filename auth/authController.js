require("dotenv").config();
const User = require("../models/Users");
const jwt = require("jsonwebtoken");

// handling errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  // defining errors for objects
  let errors = { email: "", password: "" };

  // incorrect email (login)
  if (err.message === "Incorrect Email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "Incorrect Password") {
    errors.email = "That password is incorrect";
  }

  // duplicate email errors
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation of errors,
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

/* creating a JWT is as same as managing a cookie, its more reliable
and friendly in syntax, it takes in the user id, which defines the 
user and saves it, so that user can stay logged for certain time
even though they close their tabs*/
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.secret, {
    expiresIn: maxAge,
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render("signup");
};

module.exports.login_get = (req, res) => {
  res.render("login");
};

// storing new user data, with certain criterias mentioned in MODELS
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  //asking for credentials, storing as objects, destructured

  try {
    const user = await User.create({ email, password });
    // passing id, default created for the user
    const token = createToken(user._id);
    // maxAge in cookie is stored in "ms"
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    // responding with the specific type of error to user, refer MODELS
    const errors = handleErrors(err);
    // sending errors as json
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  // login credentials, to check existence

  try {
    // analogy with signup try-catch
    const user = await User.login(email, password);
    const token = createToken(user._id);
    // jwt
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

/* replacing JWT with another empty JWT with very short life
and redirecting the user
*/
module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
