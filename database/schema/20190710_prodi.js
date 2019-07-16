module.exports.up = {
    'table_name' : 'prodi',
    'engine' : 'innoDB',
    'blueprint' : function(){
        increment('id');
        varchar('nama_prodi', 100),unique();
    }
};