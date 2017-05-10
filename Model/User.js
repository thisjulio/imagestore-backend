const Promise = require('promise');
const db = require("../db");

db.setTypeDb("user");

db.setIndex(["email"]);
db.setUnique(["email"]);

const mockUser = {
	id: "mockUser",
	email: "mock@user.com",
	name: "Usuário Mockado",
	password:"$2a$10$CjzylXoZ3cufL8T/NDUZ8.fNWU/mIF0NuR/zcSwSlTP5J4KKPtChO" // 123456
};

const database = [mockUser];

const copyOf = (obj) => (JSON.parse(JSON.stringify(obj)));

exports.all = () => db.find({});

exports.findById = (id) => new Promise((resolve,reject)=>{
	db.find({
		selector:{
			_id: {$eq: id}
		}
	}).then(
		(docs) => {
			if(docs.length) resolve(docs[0])
			else reject(Error("Usuário não encontrado!"))
		}
	).catch(
		(error) => reject(error)
	);
});

exports.findByEmail = (email) => new Promise((resolve,reject)=>{
	db.find({
		selector:{
			email: {$eq: email}
		}
	}).then(
		(docs) => {
			if(docs.length) resolve(docs[0])
			else reject(Error("Usuário não encontrado!"))
		}
	).catch(
		(error) => reject(error)
	);
});

exports.create = (name,email,password) => new Promise((resolve,reject)=>{
	db.put({
		name: name,
		email: email,
		password: password
	}).then((response)=>{
		resolve();
	}).catch((error)=>{
		reject(error);
	});
});

// exports.create("Usuário de banco","usuario@banco.com","$2a$10$CjzylXoZ3cufL8T/NDUZ8.fNWU/mIF0NuR/zcSwSlTP5J4KKPtChO").then(
// 	()=>{
// 		db.find({selector: {_id: {$exists:true}}}).then((users)=>console.log(users));
// 	}
// ).catch((err)=>console.log(err));

// exports.findByEmail("email@fulano.com").then((res)=>console.log(res)).catch((err)=>console.log(err));
