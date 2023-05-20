const router = require("express").Router();
const {
	retrieveAllUsers,
	getOneUser,
	updateUser,
	deleteUser,
	filterUserByEmail,
	filterUserByIsActive,
	updateIsActive,
} = require("../controllers/user/userControl");

router.get("/", retrieveAllUsers);
router.get("/:id", getOneUser);
router.put("/update/:id", updateUser);
router.put("/status/:id", updateIsActive);
router.delete("/delete/:id", deleteUser);
router.post("/filter/email", filterUserByEmail);
router.get("/filter/active", filterUserByIsActive);

module.exports = router;
