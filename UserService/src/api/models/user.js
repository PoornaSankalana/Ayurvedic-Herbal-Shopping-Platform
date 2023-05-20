const mongoose = require("mongoose");

const user = new mongoose.Schema(
	{
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		mobile: { type: String, required: true },
		nic: { type: String, required: true },
		dob: { type: String, required: true },
		gender: { type: String, required: true },
		address: { type: String, required: true },
		url: { type: String, required: true },
		password: { type: String, required: true },
		role: { type: String, default: "user" },
		isActive: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

module.exports = mongoose.model("users", user);
