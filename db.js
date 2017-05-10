const Promise = require('promise');
const PouchDB = require('pouchdb');
const uuidV4 = require('uuid/v4');

PouchDB.plugin(require('pouchdb-find'));

const db = new PouchDB('BD/BD');

let typeDb = "default";

let unique = [];

const emptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

exports.setTypeDb = (type) => {typeDb = type; console.log(typeDb)};

exports.setUnique = (indexList) => {
	unique = indexList;
}

exports.setIndex = (indexList) => {
	db.createIndex({
		index: {
			fields: indexList
		}
	});
}

exports.setIndex(["typedb"]);

exports.put = (doc) => new Promise( (resolve,reject) => {
	let selector = {};
	unique.map((index) => {
		selector[index] = { $eq: doc[index] };
	});
	exports.find({
		selector: selector
	}).then(
		(docs) => {
			if(!emptyObject(selector) && docs.length) reject(Error("Violação de chave única!"));
			doc._id = uuidV4();
			doc.typedb = typeDb;
			doc.created_at = new Date();
			db.put(doc).then((response)=>{
				resolve();
			}).catch((error)=>{
				reject(error);
			});
		}
	);
});

exports.find = (query) => new Promise( (resolve,reject) => {
	if(emptyObject(query))
		query.selector = {typedb:{$eq: typeDb}};
	db.find(query).then(
		(result) => {
			resolve(result.docs);
		}
	).catch(
		(error) => reject(error)
	);
});
