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

/*
TODO :
 1. Ngerjain module update 
*/
module.exports.update = {
    'blueprint' : function(){
        column('id'),integer('id',50),primary(); //! Just update type column !
        // column('nama'),rename('NAMA'); //! Just rename column !
        // addColumn(),varchar('no_tlp'),nullable(); //! For add column !
        // addIndex(),index(['no_tlp'],'idx_no_tlp'); //! For add index with custom name index !
        // addIndex(),index(['no_tlp']); //! For add index without custom name index !
        // renameIndex('idx_no_tlp','index_no_tlp'); //! For renam index !
    }
};