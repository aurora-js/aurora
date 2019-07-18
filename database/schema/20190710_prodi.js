module.exports.create = {
    'table_name' : 'prodi',
    'engine' : 'innoDB',
    'blueprint' : function(){
        increment('id');
        varchar('nama_prodi', 100),unique();
        decimal('desimal');
    }
};