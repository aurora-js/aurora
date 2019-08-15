module.exports.create = {
    'table_name' : 'mahasiswa',
    'engine' : 'innoDB',
    'blueprint' : function(){
        increment('id');
        integer('id_prodi_fk');
        varchar('Email', 100),unique();
        varchar('PASSWORD', 100);
        bigInteger('NIK'),nullable();
        //foreign('id_prodi_fk'),references('prodi','id'),onDelete('CASCADE'),onUpdate('RESTRICT');
        // index(['NIK','nama']);
    }
};

module.exports.update = {
    'blueprint' : function(){
        //column('NIK'),integer('NIK',10),unique(); //! For update type  or Renamecolumn !
        // addColumn(),varchar('no_tlp'),nullable(); //! For add column !
        // addIndex(),index(['no_tlp'],'idx_no_tlp'); //! For add index with custom name index !
        // addIndex(),index(['no_tlp']); //! For add index without custom name index !
        // renameIndex('idx_no_tlp','index_no_tlp'); //! For renam index !
    }
};

module.exports.delete = {
    'blueprint' : function(){
        //dropForeign('id_prodi_fk');
        //dropUnique('NIK');
        dropIfExistsTable('prodi');
    }
};