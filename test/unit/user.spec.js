"use strict";

const { ServiceBroker } = require("moleculer");
const UserService = require("../../services/user.service");

describe("Test 'user' service", () => {
	let broker = new ServiceBroker();
	broker.createService(UserService);

	beforeAll(() => broker.start());
	afterAll(() => {
		broker.stop();
	});

	
	describe("Test 'users.create' action", () => {

		it("should return user with token", () => {
			const user = {
				username: "test",
				password: "test1234",
				email: "test@test.com"
			};
			broker.call("users.create",{user}).then(x=>{
				const o=1;
				console.log(x);
			});

		});

	});

});