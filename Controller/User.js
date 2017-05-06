const UserModel = require("../Model/User");
const bcrypt = require("bcryptjs");

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

exports.signup = (name,email,password) => {
	return genHashPassword(password).then(
		(hash) => UserModel.create(name,email,hash)
	);
};

exports.login = (email,password) => {
	return UserModel.findByEmail(email).then(
		(user) => checkPasswordHash(password,user.password).then(
			() => user
		)
	);
};

exports.recoverPassword = (email) => {};

exports.update = (dataToUpdate) => {};

exports.login("mock@user.com","123456").then((r)=>console.log(r)).catch((err)=>{console.log(err)});
