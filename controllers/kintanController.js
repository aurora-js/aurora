//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
main.read({
	'models' : ['kintanModels'],
	'select' : ['*']
}).then(function (q) {
		 try {
			 return(q);;
		 }catch(error){

		}
	},function(err){
		 try{
			return(err.action);
			} catch(error){

		} 
	});
}

function create(req, res) {
	main.insert({
	'models' : ['kintanModels'],
	'field' : [],
	'result' : [
	
	]
	}).then(function (q) {
		 try {
			 return q;
		 }catch(error){

		}
	},function(err){
		 try{

			}catch(error){

		} 
	});
}

function update(req, res) {
	main.update({
	'models' : ['kintanModels'],
	'set' : [
	],
	'where' : [
		['undefined','=',req.body.undefined]
	]
	}).then(function (q) {
		 try {
			 return q; 
		 }catch(error){

		}
	},function(err){
		 try{

			}catch(error){

		} 
	});
}

function erase(req, res) {
main.erase_query({
	'models' : ['kintanModels'],
	'where' : [
		['undefined','=',req.params.undefined]
	]
}).then(function (q) {
		 try {
			 return(q);;
		 }catch(error){

		}
	},function(err){
		 try{
			return(err.action);
			} catch(error){

		} 
	});
}


module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.erase = erase;
