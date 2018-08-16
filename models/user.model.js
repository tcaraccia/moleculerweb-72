const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		index: true,
		lowercase: true,
		required: "Please fill in a username",
		trim: true
	},
	password: {
		type: String,
		required: "Please fill in a password"
	},
	fullName: {
		type: String,
		trim: true,
		"default": ""
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		index: true,
		lowercase: true,
		required: "Please fill in an email"
	},
	image: {
		type: String,
		trim: true
	},
	kind: {
		type: String,
		enum: ["DRIVER","PASSENGER","ADMIN"]
	}   
},{
	collection: "users"
});

module.exports = mongoose.model("User",UserSchema);