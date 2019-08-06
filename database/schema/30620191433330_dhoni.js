module.exports.create = {
	'table_name': 'dhoni',
	'engine': 'innoDB',
	'blueprint': function () {
		integer('coba');
		varchar('mata', 200);
	}
};

module.exports.update = {
	'blueprint': function () {
		addColumn(), varchar('no_tlp', 22), nullable();
		addColumn(), bit('field_bit', 6);
		addColumn(), serial('field_serial');
		//addIndex(), index(['desimal'], 'idx_desimals');
		addIndex(), index(['mata']);
	}
};

module.exports.delete = {
	'blueprint': function () {
		dropColumn('mata');
	}
};
