function index(req, res) {
 
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
 
}

