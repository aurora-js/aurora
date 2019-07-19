module.exports.create = {
    'table_name' : 'prodi',
    'engine' : 'innoDB',
    'blueprint' : function(){
        increment('id');
        varchar('nama_prodi', 100);
        decimal('desimal');
    }
};

module.exports.update = {
    'blueprint' : function(){
        //column('desimal'),varchar('desimal',50); //! Just update type column / Rename!
        //addColumn(),varchar('no_tlp2',12),nullable(); //! For add column !
        //addIndex(),index(['desimal'],'idx_desimal'); //! For add index with custom name index !
        //addIndex(),index(['nama_prodi']); //! For add index without custom name index !
        //renameIndex('idx_desimal','index_desimal'); //! For renam index ! ini ga bisa untuk maria DB
    }
};