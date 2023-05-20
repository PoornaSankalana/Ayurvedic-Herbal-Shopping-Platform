const router = require("express").Router();
const {
	register,
	login,
	logout,
} = require("../controllers/auth/authControls");

router.post("/user", register);
router.post("/logout", logout);
router.post("/", login);

module.exports = router;
