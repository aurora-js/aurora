module.exports.create = {
    'table_name' : 'mahasiswa',
    'engine' : 'innoDB',
    'blueprint' : function(){
        increment('id');
        integer('id_prodi_fk');
        varchar('nama', 100),unique();
        bigInteger('NIK'),nullable();
        foreign('id_prodi_fk'),references('prodi','id'),onDelete('CASCADE'),onUpdate('RESTRICT');
        index(['NIK','nama']);
    }
};