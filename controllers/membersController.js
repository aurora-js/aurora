//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
main.read({
	'models' : ['membersModel'],
	'select' : ['*']
}).then(function (q) {
		 try {
			
			}catch(error){

		}
	},function(err){
		 try{
			
			}catch(error){

		} 
	});
}

function create(req, res) {
	main.insert({
	'models' : ['membersModel'],
	'field' : ['name','age'],
	'result' : [
		req.body.name,
		req.body.age
	
	]
	}).then(function (q) {
		 try {
			
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
	'models' : ['membersModel'],
	'set' : [
		['name','=',req.body.name],
		['age','=',req.body.age]
	],
	'where' : [
		['name','=',req.body.name]
	]
	}).then(function (q) {
		 try {
			
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
	'models' : ['membersModel'],
	'where' : [
		['name','=',req.params.name]
	]
}).then(function (q) {
		 try {
			
			}catch(error){

		}
	},function(err){
		 try{
			
			}catch(error){

		} 
	});
}


module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.erase = erase;
