module.exports.up = {
    'table_name' : 'mahasiswa',
    'blueprint' : function(){
        increment('id');
        varchar('nama', 100),unique();
        bigInteger('NIK'),nullable();
        index('nik_index',['NIK']);
    }
};