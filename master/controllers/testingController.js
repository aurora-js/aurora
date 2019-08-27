//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
	main.read({
	'models' : ['testingModel'],
	'select' : ['*']
	}).then(function (q) {
		 try {
			 console.log(q);
			res.render('test', {
                page_title: "Dummy - Node.js",
                data: q.data
            });
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
	'field' : ['id','title','deskripsi'],
	'result' : [
		req.body.id,
		req.body.title,
		req.body.deskripsi
	
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
		['id','=',req.body.id],
		['title','=',req.body.title],
		['deskripsi','=',req.body.deskripsi]
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
