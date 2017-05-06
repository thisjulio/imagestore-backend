const router = require('express').Router();

// Configurando Cors
router.use(require('cors')());

// Ativando parser de dados de formulário e objeto para multipart
// Body Parser
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// Multer
const multer = require('multer');

// Arquivo padrão de rotas, escrever as rotas abaixo...



// Fim das rotas

module.exports = router;
