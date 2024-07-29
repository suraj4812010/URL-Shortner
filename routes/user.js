const express = require("express");
const { userSignup, userLogin, userLogout } = require("../controllers/user");
const { checkAuth,restrictToLoggedInUser } = require("../middlewares/Auth");

const router = express.Router();

router.post("/", userSignup)
router.post("/login",userLogin);
router.post("/logout",checkAuth, userLogout)

module.exports = router;