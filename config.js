let config = {};

config.server = {
	port: 3000,
	apiUrl: "http://localhost:3000/",
	appUrl: "http://localhost:3001/"
};

config.jwt = {
	secret: "secret"
};

module.exports = config;
