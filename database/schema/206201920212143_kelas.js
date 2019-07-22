module.exports.create = { 
	'table_name' : 'kelas', 
	'engine' : 'innoDB', 
	'blueprint' : function(){
		increment('id');
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
