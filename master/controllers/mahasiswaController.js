//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
	main.read({
	'models' : ['mahasiswaModel'],
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
	'models' : ['mahasiswaModel'],
	'field' : ['id','nim'],
	'result' : [
		req.body.id,
		req.body.nim
	
	]
	}).then(function (q) {
		 try {
			console.log(q);
			}catch(error){

		}
	},function(err){
		 try{
			console.log(err);
			}catch(error){

		} 
	});
}

function update(req, res) {
	main.update({
	'models' : ['mahasiswaModel'],
	'set' : [
		['id','=',req.body.id],
		['nim','=',req.body.nim]
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
	'models' : ['mahasiswaModel'],
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
	'models' : ['mahasiswaModel'],
	'where' : [
		['id','=',req.params.id]
	]
	}).then(function (q) {
		 try {
			console.log(q);
			}catch(error){

		}
	},function(err){
		 try{
			console.log(err);
			}catch(error){

		} 
	});
}


module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.show_edit = show_edit;
module.exports.erase = erase;
