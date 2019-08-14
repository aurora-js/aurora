module.exports.create = {
	'table_name': 'dhoni3',
	'engine': 'innoDB',
	'blueprint': function () {
		year('field_year', 10);
		varchar('field_varchar', 10);
	}
};

module.exports.update = {
	'blueprint': function () {
		addColumn(), text('field_text', 10);
		addColumn(), longtext('bisa_longtext');
		addColumn(), binary('field_binary', 10);
	}
};

module.exports.delete = {
	'blueprint': function () {

	}
};
