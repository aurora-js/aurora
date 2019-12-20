module.exports.table_name = "users";

module.exports.rulesOnCreate = {
	id : "",
	name : "string",
	email : "string,email",
	email_verified_at : "required",
	password : "string,password_confirmation",
	remember_token : "string,required",
	created_at : "required",
	updated_at : "required"
};


module.exports.rulesOnUpdate = {
	id : "",
	name : "string",
	email : "string,email",
	email_verified_at : "required",
	password : "string,password_confirmation",
	remember_token : "string,required",
	created_at : "required",
	updated_at : "required"
};


