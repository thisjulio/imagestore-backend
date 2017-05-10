const config = require("../config");
const UserModel = require("../Model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const moment = require("moment");


const genHashPassword = (password) => new Promise((resolve,reject)=>{
	bcrypt.genSalt(10, function(err, salt) {
		if(err) reject(err);
		else bcrypt.hash(password, salt, function(err, hash) {
			if(err) reject(err);
			else resolve(hash)
		});
	});
});

const checkPasswordHash = (password,hash) => new Promise((resolve,reject)=>{
	bcrypt.compare(password, hash, function(err, res) {
		if(err) reject(err);
		else if (res) resolve();
		else reject(Error("Senha incorreta"));
	});
});

const genToken = (issuer) => {
	let expires = moment().add(config.jwt.expires,'days').valueOf();
	let token = jwt.encode({
		iss: issuer,
		exp: expires
	},config.jwt.secret);
	return Promise.resolve({token:token,expires:expires});
};

const decodeToken = (token) => {
	try {
		let decoded = jwt.decode(token,config.jwt.secret);
		if (decoded.exp <= Date.now()) return Promise.reject("Token Expirado!");
		return Promise.resolve(decoded.iss);
	}catch(err){
		return Promise.reject(err);
	}
}

exports.signup = (name,email,password) => {
	return genHashPassword(password).then(
		(hash) => UserModel.create(name,email,hash)
	);
};

exports.login = (email,password) => {
	return UserModel.findByEmail(email).then(
		(user) => checkPasswordHash(password,user.password).then(
			() => {
				delete user.password; // Escondendo o hash da senha
				return genToken(user.id).then((loginData)=>{
					delete user.id; // Escondendo o id (usuário com token)
					loginData.user = user;
					return loginData;
				});
			}
		)
	).catch((err)=>Promise.reject(Error("Usuário ou senha incorreta.")));
};

exports.tokenAccess = (token) => {
	return decodeToken(token).then(
		(userId) => UserModel.findById(userId).then(
			(user) => {
				delete user.password; // Escondendo a senha
				return user;
			}
 		)
	)
};

exports.recoverPassword = (email) => {};

exports.update = (dataToUpdate) => {};

// exports.login("mock@user.com","123456").then((r)=>console.log(r)).catch((err)=>{console.log(err)});
// exports.tokenAccess("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJtb2NrVXNlciIsImV4cCI6MTQ5NDY4NTI0ODU1OX0.bGKUHB9ebC-zSnd09F5XTTIGxjDR5sW2tIqZIsadNdY").then((r)=>console.log(r)).catch((err)=>{console.log(err)});
