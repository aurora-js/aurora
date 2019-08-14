module.exports.create = { 
	'table_name' : 'kintan', 
	'engine' : 'innoDB', 
	'blueprint' : function(){
		integer('NIM');
		varchar('NAMA', 200);
	}
};

module.exports.update = {
	'blueprint' : function(){

	}
};

module.exports.delete = {
	'blueprint' : function(){

	}
};
