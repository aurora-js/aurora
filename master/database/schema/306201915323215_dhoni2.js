module.exports.create = {
	'table_name': 'dhoni2',
	'engine': 'innoDB',
	'blueprint': function () {
		integer('nims'), primary();
		varchar('nama_terlaksana', 20);
	}
};

module.exports.update = {
	'blueprint': function () {
		addColumn(), datetime('field_datetime', 4);
		addColumn(), timestamp('timestamp', 6);
		addColumn(), time('time', 6);
	}
};

module.exports.delete = {
	'blueprint': function () {

	}
};
