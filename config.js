let config = {};

config.server = {
	port: 3000,
	apiUrl: "http://localhost:3000/",
	appUrl: "http://localhost:3001/"
};

config.jwt = {
	secret: "secret",
	expires: '7'
};

config.imgur = {
	clientId: "6d36a9c00d94e1d"
};

module.exports = config;
