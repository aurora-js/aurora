module.exports.create = {
    'table_name' : 'prodi',
    'engine' : 'innoDB',
    'blueprint' : function(){
        // increment('id');
        integer('id'),primary();
        varchar('nama_prodi', 100);
        decimal('desimal');
    }
};

module.exports.update = {
    'blueprint' : function(){
        column('desimal'),varchar('desimal',50); //! Just update type column / Rename!
        addColumn(),varchar('no_tlp',12),nullable(); //! For add column !
        addIndex(),index(['desimal'],'idx_desimal'); //! For add index with custom name index !
        addIndex(),index(['nama_prodi']); //! For add index without custom name index !
    }
};

module.exports.delete = {
    'blueprint' : function(){
        dropColumn('no_tlp');
        //dropIndex('idx_desimal');
        //dropPrimary();
    }
};