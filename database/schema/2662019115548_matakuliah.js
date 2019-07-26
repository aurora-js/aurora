module.exports.create = { 
	'table_name' : 'matakuliah', 
	'engine' : 'innoDB', 
	'blueprint' : function(){
		increment('id');
		varchar('nama_matakuliah',100);	
	}
};

module.exports.update = {
	'blueprint' : function(){
		addColumn(),integer('sks',2);
	}
};

module.exports.delete = {
	'blueprint' : function(){
		dropTable('matakuliah');
	}
};
