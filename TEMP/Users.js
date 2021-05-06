const mongoose = require("mongoose");
const { isEmail } = require("validator");
//validator is a 3rd party validation package that does as name suggests
const bcrypt = require("bcrypt");

//database structure
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an Email"],
    unique: true, // checks is email is unique to database
    lowercase: true, // storing in lowercase
    validate: [isEmail, "Please enter a valid email"], //to check if existing email
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  wallet: {
    // wallet that will be used to bid
    type: Number,
    required: true,
    default: 5000,
  },
  bioData: {
    type: String,
    required: true,
    default: "This is a general User",
  },
});

// "pre" method, fires the function before saving to DB
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10); // cryptofying the password, default salt length is 10
  next();
});

// static method to login
userSchema.statics.login = async function (email, password) {
  // find that one valid email for login
  const user = await this.findOne({ email });
  if (user) {
    // converting input password into hash and comparing with database hash
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

/*the model name that we provide here must be
singular form of name of database collection which 
in our case is "users"
*/
const Users = mongoose.model("user", userSchema);

module.exports = Users;
