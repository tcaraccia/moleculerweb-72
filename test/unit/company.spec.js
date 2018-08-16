"use strict";

const { ServiceBroker } = require("moleculer");
const CompanyService = require("../../services/company.service");

describe("Test 'company' service", () => {
	let broker = new ServiceBroker();
	broker.createService(CompanyService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	
	describe("Test 'companies.create' action", () => {

		it("should company with  id", () => {
			broker.waitForServices("companies").then(()=>{
				expect(broker.call("companies.create",
					{
						company: {
							taxnumber:"1231",
							name: "Test Company"
						}
					})).rejects.toBe("Hello World");
			});


		});

	});

});