"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const Trip = require("../models/trip.model");

module.exports = {
	name: "trips",
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI || "mongodb://localhost/movingfast"),
	model: Trip,
	actions: {
		create: {
			params: {
				from: { type: "string" },
				to: { type: "string"  },
				company: { type: "string"}
			}
		}
	},

	events: {
		"cache.clean.users"() {
			if (this.broker.cacher)
				this.broker.cacher.clean(`${this.name}.*`);
		},
		"cache.clean.follows"() {
			if (this.broker.cacher)
				this.broker.cacher.clean(`${this.name}.*`);
		}
	}
};