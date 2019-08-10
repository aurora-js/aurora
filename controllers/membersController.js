//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
main.read({
	'models' : ['membersModel'],
	'select' : ['*'],
	
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
			 console.log(q); 
			 console.log('berhasil update');
		 }catch(error){

		}
	},function(err){
		 try{
			console.log(err.action);
			} catch(error){

		} 
	});
}

function erase(req, res) {
main.erase_query({
	'models' : ['membersModel'],
	'where' : [
		['name','=',req.params.name]
	]
});
}


module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.erase = erase;
