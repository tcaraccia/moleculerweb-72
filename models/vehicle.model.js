const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
	company: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Company",
	},
	brand: String,
	plate: String,
	ontrip: Boolean,
	seats: Number,
	load: Number,
	location: {
		type: { type: String },
		coordinates: [Number],
	},
	drivers: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "User"
		}
	],
	trips: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Trip"
		}
	]
}, {
	collection: "trips",
	timestamps: true
});

module.exports = mongoose.model("Vehicle", VehicleSchema);