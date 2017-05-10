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

// APP requires
const UserController = require("./Controller/User");

// Arquivo padrão de rotas, escrever as rotas abaixo...

router.post("/user/login",(req,res,next)=>{
	setTimeout(()=>{
		UserController.login(req.body.email,req.body.password).then(
			(dataLogin) => res.json(dataLogin)
		).catch(
			(err) => next(err)
		);
	},5000);
});

router.get("/user/test",(req,res,next)=>{
	let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	UserController.tokenAccess(token).then(
		(user) => res.json(user)
	).catch(
		(err) => next(err)
	);
});

// Fim das rotas

module.exports = router;
