const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({

	name: String,
	street: String,
	zip: String,
	city: {
		name: String,
		state: String,
		country: String
	},
	geo: {
		type: { type: String },
		coordinates: [Number],
	},
	companies: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Company"
		}
	]

}, {
	collection: "locations"
});

module.exports = mongoose.model("Location", LocationSchema);