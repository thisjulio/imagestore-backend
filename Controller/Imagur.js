const config = require("../config");
const imgur = require('imsave')(config.imgur.clientId);
const fs = require('fs');
const Promise = require("promise");
const imagesModel = require("../Model/Images");

exports.upload = (name,file) => new Promise(
	(resolve,reject) => {
		imgur(fs.readFileSync(file),(err,res)=>{
			if(err) reject(err);
			else imagesModel.create(name,res).then(
				() => resolve()
			).catch(
				(error) => reject(error)
			)
		});
	}
);

exports.upload("junda","test.png").then((res)=>console.log(res),(err)=>console.log(err));

imagesModel.all().then(
	(i) => console.log(i)
);
