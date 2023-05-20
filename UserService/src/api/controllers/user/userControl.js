const User = require("../../models/user");
const bcryptjs = require("bcryptjs");

const retrieveAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({
			data: users,
			message: "Fetching users successfull !",
		});
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const getOneUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });

		if (!user) {
			return res.status(404).json({ message: "User Not Found!" });
		} else {
			return res
				.status(200)
				.json({ data: user, message: "User Found !" });
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const updateUser = async (req, res) => {
	const paramsID = req.params.id;
	try {
		const user = await User.findById(paramsID);
		if (!user) {
			return res.status(404).json({ message: "User Not Found!" });
		} else {
			const {
				firstname,
				lastname,
				email,
				mobile,
				nic,
				dob,
				gender,
				address,
			} = req.body;

			const updatedUser = await User.findByIdAndUpdate(paramsID, {
				firstname,
				lastname,
				email,
				mobile,
				nic,
				dob,
				gender,
				address,
			});

			return res.status(200).json({
				data: updatedUser,
				message: "User Updated Successfully !",
			});
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User Not Found!" });
		} else {
			const deletedUser = await User.findByIdAndDelete(
				req.params.id,
			);

			return res.status(200).json({
				data: deletedUser,
				message: "User Deleted Successfully !",
			});
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const filterUserByEmail = async (req, res) => {
	try {
		let { searchFilter } = req.body;

		let UserViewModel = [];

		if (searchFilter) {
			UserViewModel = await User.find({
				email: { $regex: searchFilter, $options: "i" },
			});
		} else {
			UserViewModel = await User.find();
		}

		res.status(200).json({ data: UserViewModel });
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const filterUserByIsActive = async (req, res) => {
	try {
		// let { searchFilter } = req.body;

		console.log(req.body);

		let UserViewModel = [];

		UserViewModel = await User.find({
			isActive: false,
		});

		res.status(200).json({ data: UserViewModel });
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const updateIsActive = async (req, res) => {
	try {
		const paramsID = req.params.id;

		const { isActive } = req.body;

		if (isActive) {
			const updatedUser = await User.findByIdAndUpdate(paramsID, {
				isActive: isActive,
			});

			return res.status(200).json({
				data: updatedUser,
				message: "User Account Activated !",
			});
		} else {
			const updatedUser = await User.findByIdAndUpdate(paramsID, {
				isActive: isActive,
			});

			return res.status(200).json({
				data: updatedUser,
				message: "User Account Deactivated !",
			});
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

module.exports = {
	retrieveAllUsers,
	getOneUser,
	updateUser,
	deleteUser,
	filterUserByEmail,
	filterUserByIsActive,
	updateIsActive,
};
