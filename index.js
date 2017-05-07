const config = require('./config');

const express = require('express');
const app = express();

const routes = require('./routes');
app.use(routes);

const errorHandler = require('./errorHandler');
app.use(errorHandler);

const server = app.listen(config.server.port, function () {
  console.log(`Servidor escutando na porta ${config.server.port} e acessível pela url: ${config.server.apiUrl}...`);
});
