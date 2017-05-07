const Promise = require('promise');

const mockUser = {
	id: "mockUser",
	email: "mock@user.com",
	name: "Usuário Mockado",
	password:"$2a$10$CjzylXoZ3cufL8T/NDUZ8.fNWU/mIF0NuR/zcSwSlTP5J4KKPtChO" // 123456
};

const database = [mockUser];

const copyOf = (obj) => (JSON.parse(JSON.stringify(obj)));

exports.all = () => new Promise((resolve,reject)=>{
	resolve(database);
});

exports.findById = (id) => new Promise((resolve,reject)=>{
	if(id==mockUser.id) resolve(copyOf(mockUser));
	else reject(Error("Usuário não encontrado!"));
});

exports.findByEmail = (email) => new Promise((resolve,reject)=>{
	if(email==mockUser.email) resolve(copyOf(mockUser));
	else reject(Error("Usuário não encontrado!"));
});

exports.create = (name,email,password) => new Promise((resolve,reject)=>{
	reject(Error("Banco de dados ainda não implementado"));
});
