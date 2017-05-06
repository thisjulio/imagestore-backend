const Promise = require('promise');

exports.all = () => new Promise((resolve,reject)=>{
	reject(Error("Banco de dados ainda não implementado"));
});

exports.findById = (id) => new Promise((resolve,reject)=>{
	reject(Error("Banco de dados ainda não implementado"));
});

exports.findByEmail = (email) => new Promise((resolve,reject)=>{
	reject(Error("Banco de dados ainda não implementado"));
});

exports.create = (email,name,password) => new Promise((resolve,reject)=>{
	reject(Error("Banco de dados ainda não implementado"));
});
