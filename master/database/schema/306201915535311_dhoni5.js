module.exports.create = {
	'table_name': 'dhoni5',
	'engine': 'innoDB',
	'blueprint': function () {
		multilinestring('coba_multilinestring', 10);
		multipolygon('tst_multipolygon', 22);
	}
};

module.exports.update = {
	'blueprint': function () {
		addColumn(), polygon('tst_polygon', 7);
		addColumn(), multipoint('coba_multipoint', 9);
	}
};

module.exports.delete = {
	'blueprint': function () {

	}
};
