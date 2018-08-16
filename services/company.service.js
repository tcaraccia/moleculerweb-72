"use strict";

const { MoleculerClientError } = require("moleculer").Errors;

const DbService = require("moleculer-db");
const MongooseAdapter = require("moleculer-db-adapter-mongoose");
const Company = require("../models/company.model");
const events = require("../events");
/**
 * La regla es un model por service, para pasar data a otro servicio
 * usamos this.broker.emit(evento, payload) y subscribimos un listener
 * en el servicio que queremos levantar el payload.
 */
module.exports = {
	name: "companies",
	mixins: [DbService],
	adapter: new MongooseAdapter(process.env.MONGO_URI || "mongodb://localhost/movingfast"),
	model: Company,
	actions: {
		create: {
			params: {
				company: { type: "object"}
			},
			handler(ctx){
				let entity = ctx.params.company;
				return this.validateEntity(ctx)
					.then(()=>{
						if(entity.taxnumber) {
							return this.adapter.findOne({taxnumber:entity.taxnumber})
								.then(found => {
									if(found) return Promise.reject(new MoleculerClientError("Company already exists", 422, "", [{ field: "taxnumber", message: "exists" }]));
								});
						}
					})
					.then(()=> {
						return this.adapter.insert(entity)
							.then(doc => this.transformDocuments(ctx, {}, doc))
							.then(json => this.entityChanged("created", json, ctx).then(() => {
								this.broker.emit(events.COMPANY.CREATED,json);
								this.broker.logger.info(events.COMPANY.CREATED,json);
								return json;
							}));
					});
			}
		}
	},
};