"use strict";

let path = require("path");
const ApiGateway = require("moleculer-web");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const serveStatic = require("serve-static");
const compression = require("compression");

const config = require("../webpack.config");
const compiler = webpack(config);

module.exports = {
	name: "www",
	middleware:false,
	mixins: [ApiGateway],
	settings: {
		port: 3000,
		routes: [
			{
				path: "/api",
				aliases: {
					"GET health": "$node.health",
				},
				bodyParsers: {
					json: true,
					urlencoded: { extended: true }
				}
			},
			{
				path: "/",
				use: [
					compression(),
					devMiddleware(compiler, {
						noInfo: true,
						publicPath: config.output.publicPath,
						headers: { "Access-Control-Allow-Origin": "*" }
					}),
					hotMiddleware(compiler),
					serveStatic(path.join(__dirname, "../public"))
				],
			},
		]
	}
};