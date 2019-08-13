module.exports.table_name = "members";

module.exports.rulesOnCreate = {
    name : "string,required",
    age : "string"
};

module.exports.rulesOnUpdate = {
    name : "string,required",
	age : "string"
};


