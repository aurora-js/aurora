module.exports.table_name = "mahasiswa";

module.exports.rulesOnCreate = {
    'field' : "array, required, max => 2, min => 5, email, password_confirmation, message_required => error required, message_min => error min",
}

module.exports.rulesOnUpdate = {
    
}