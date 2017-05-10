const db = require("../db");
const Promise = require("promise");

db.setTypeDb("images");

exports.create = (name,url) => new Promise(
	(resolve,reject) => {
		db.put({name:name,url:url}).then(
			() => resolve()
		).catch(
			(error) => reject(error)
		);
	}
);

exports.all = () => db.find({});
