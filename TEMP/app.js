const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection link
const dbURI =
  "mongodb+srv://avgCoderr:123@rishabh.4a6ad.mongodb.net/RISHABHretryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(3000);
    console.log("Listening to Port 3000...");
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.render("home"));
// requireAuth now can be implemented on any page
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.get("/profile", requireAuth, (req, res) => res.render("profile"));

// made some default templates for frontend implementation purposes
// do implement "requireAuth" for each sensitive pages for updation, bidding and marketplace
app.use("/api/profile", requireAuth, require("./routes/profile"));
app.use("/api/biddingZone", requireAuth, require("./routes/biddingZone")); // bidding zone

app.use(authRoutes);
