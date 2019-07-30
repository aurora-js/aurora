module.exports.table_name = "prodi";

module.exports.rulesOnCreate = {
	id : "number",
	nama_prodi : "string,required",
	desimal : "string,required",
	field_float : "required",
	field_varchar : "string,required",
	bisa_longtext : "string,required",
	no_tlp : "string"
};


module.exports.rulesOnUpdate = {
	id : "number",
	nama_prodi : "string,required",
	desimal : "string,required",
	field_float : "required",
	field_varchar : "string,required",
	bisa_longtext : "string,required",
	no_tlp : "string"
};


