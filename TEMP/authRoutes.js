const { Router } = require("express");
const authController = require("../controllers/authController");

const router = Router();

//analogy to app.methods
//everytime they are called upon, the authController modules fire up

router.get("/signup", authController.signup_get); //communicate with frontend, input
router.post("/signup", authController.signup_post); //communicate with database
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get); //nothing to be done with database so no post

module.exports = router;
