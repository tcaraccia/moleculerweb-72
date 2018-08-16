const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	name: String,
	taxnumber: String, //CUIT o CUIL
	vehicles: [
		{
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Vehicle"
		}
	],
	emails: {
		admin: String,
		billing: String,
		customersup: String,
	},
	addresses: [
		{
			name: String,
			street: String,
			zip: String,
			city: {
				name: String,
				state: String,
				country: String
			},
			location: {
				type: { type: String },
				coordinates: [Number],
			}
		}
	]

}, {
	collection: "companies",
	timestamps: true
});

module.exports = mongoose.model("Company", CompanySchema);