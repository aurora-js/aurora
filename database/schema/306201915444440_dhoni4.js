module.exports.create = {
	'table_name': 'dhoni4',
	'engine': 'innoDB',
	'blueprint': function () {
		varbinary('coba_varbinary', 10);
		blob('test_blob');
		geometry('coba_geometry', 10);
	}
};

module.exports.update = {
	'blueprint': function () {
		addColumn(), point('coba_point', 8);
		addColumn(), linestring('coba_linestring', 10);
		addColumn(), polygon('tst_polygon', 7);
		addColumn(), multipoint('coba_multipoint', 9);
	}
};

module.exports.delete = {
	'blueprint': function () {

	}
};
