module.exports.table_name = "mahasiswa";

module.exports.rulesOnCreate = {
	id : "",
	id_prodi_fk : "number,required",
	Email : "string,required,email",
	PASSWORD : "string,required,password_confirmation",
	NIK : "number"
};


module.exports.rulesOnUpdate = {
	id : "",
	id_prodi_fk : "number,required",
	Email : "string,required,email",
	PASSWORD : "string,required,password_confirmation",
	NIK : "number"
};


