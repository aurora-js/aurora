//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
	main.read({
	'models' : ['testingModel'],
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
	'models' : ['testingModel'],
	'field' : ['id','name','email','email_verified_at','password','remember_token','created_at','updated_at'],
	'result' : [
		req.body.id,
		req.body.name,
		req.body.email,
		req.body.email_verified_at,
		req.body.password,
		req.body.remember_token,
		req.body.created_at,
		req.body.updated_at
	
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
	'models' : ['testingModel'],
	'set' : [
		['name','=',req.body.name],
		['email','=',req.body.email],
		['email_verified_at','=',req.body.email_verified_at],
		['password','=',req.body.password],
		['remember_token','=',req.body.remember_token],
		['created_at','=',req.body.created_at],
		['updated_at','=',req.body.updated_at]
	],
	'where' : [
		['id','=',req.params.id]
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

function show_edit(req, res) {
	main.read({
	'models' : ['testingModel'],
	'select' : ['*'],
	'where' : [
		['id','=',req.params.id]
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
	'models' : ['testingModel'],
	'where' : [
		['id','=',req.params.id]
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
module.exports.show_edit = show_edit;
module.exports.erase = erase;
