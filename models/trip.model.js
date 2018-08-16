const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
	currentloc: {
		type: { type: String },
		coordinates: [Number],
	},
	vehicle: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Vehicle"
	},
	company: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "Company",
	},
	origin: {
		datetime: Date,
		location: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Location",
		},
		name: {
			type: String
		}
	},
	destination: {
		datetime: Date,
		location: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Location",
		},
		name: {
			type: String
		},
	},
	transits: [
		{
			price: Number,
			arrivetime: Date,
			departtime: Date,
			from: {
				name: String,
				location: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: "Location",
				}
			},
			to: {
				name: String,
				location: {
					type: mongoose.SchemaTypes.ObjectId,
					ref: "Location",
				}
			},
		}
	]
}, {
	collection: "trips",
	timestamps: true
});

module.exports = mongoose.model("Trip", TripSchema);