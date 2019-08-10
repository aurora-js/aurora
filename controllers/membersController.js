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

