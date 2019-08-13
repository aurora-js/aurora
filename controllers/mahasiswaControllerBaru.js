//declare var con from enviroment//
var main = require('../core/aurora-crud/aura/sysaura');

function index(req, res) {
main.read({
	'models' : ['mahasiswaModel'],
	'select' : ['*'],
	
});
}

function create(req, res) {
main.insert({
	'models' : ['mahasiswaModel'],
	'field' : ['id','id_prodi_fk','Email','PASSWORD','NIK'],
	'result' : [
		req.body.id,
		req.body.id_prodi_fk,
		req.body.Email,
		req.body.PASSWORD,
		req.body.NIK
	
	]
}).then(function (q) {
		 try {
			 console.log(q); 
			 console.log('berhasil insert');
		 }catch(error){

		}
	},function(err){
		 try{
			console.log(err.action);
			} catch(error){

		} 
	});
}

function update(req, res) {
main.update({
	'models' : ['mahasiswaModel'],
	'set' : [
		['id','=',req.body.id],
		['id_prodi_fk','=',req.body.id_prodi_fk],
		['Email','=',req.body.Email],
		['PASSWORD','=',req.body.PASSWORD],
		['NIK','=',req.body.NIK]
	],
	'where' : [
		['id','=',req.body.id]
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
	'models' : ['mahasiswaModel'],
	'where' : [
		['id','=',req.params.id]
	]
});
}


module.exports.index = index;
module.exports.create = create;
module.exports.update = update;
module.exports.erase = erase;
