module.exports.create = {
    'table_name' : 'prodi',
    'engine' : 'innoDB',
    'blueprint' : function(){
        increment('id');
        varchar('nama_prodi', 100),unique();
        decimal('desimal');
    }
};

module.exports.update = {
    'blueprint' : function(){
        column('id'),varchar('id',50),primary(); //! Just update type column !
        // column('nama'),rename('NAMA'); //! Just rename column !
        // addColumn(),varchar('no_tlp'),nullable(); //! For add column !
        // addIndex(),index(['no_tlp'],'idx_no_tlp'); //! For add index with custom name index !
        // addIndex(),index(['no_tlp']); //! For add index without custom name index !
        // renameIndex('idx_no_tlp','index_no_tlp'); //! For renam index !
    }
};