module.exports.create = { 
	'table_name' : 'nilai', 
	'engine' : 'innoDB', 
	'blueprint' : function(){
		increment('id');
		varchar('nama_matakuliah', 100);
		integer('nilai', 3),nullable();
	}
};

module.exports.update = {
	'blueprint' : function(){
		addColumn(),varchar('grade',255);
	}
};

module.exports.delete = {
	'blueprint' : function(){
		dropIfExistsTable('nilai');
	}
};
