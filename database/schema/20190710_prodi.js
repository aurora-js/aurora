module.exports.create = {
    'table_name': 'prodi',
    'engine': 'innoDB',
    'blueprint': function () {
        // increment('id');
        integer('id'), primary();
        varchar('nama_prodi', 100);
        decimal('desimal');
        float('field_float', 10);          //length ga bisa
        //double('field_double', 10, 22);      //coba lagi
        //real('field_real', 25);              //coba lagi
        //bit('field_bit', 6);                //table date & length bisa digunakan
        //boolean('field_boolean', 1);         //coba lagi
        //serial('field_serial');              //serial harus tanpa length dan serial itu auto increment
        //Date('field_date', 10);              //table date dan length bisa digunakan
        //datetime('field_datetime', 4);      //bisa digunakan
        //timestamp('timestamp', 6);          //bisa digunakan
        //time('time', 6);                   //bisa digunakan
        //year('field_year', 10);            //length tidak dapat digunakan dan auto increment
        //Char('field_char', 10);            //coba lagi
        varchar('field_varchar', 10);      //bisa digunakan
        //tinytext('field_tinytext', 2);     //coba lagi
        //text('field_text', 10);            //dapat digunakan tapi tidak terbaca lengthnya atau text tidak terbatas
        //mediumtext('field_mediumtext', 10);  //coba lagi
        longtext('bisa_longtext');             //dapat digunakan tapi tidak bisa menggunakan lengthnya
        //binary('field_binary', 10);           //bisa digunakan
        //varbinary('coba_varbinary', 10);        //bisa digunakan
        //tinyblob('field_tinyblob', 10);          //coba lagi
        //mediumblob('coba_mediumblob', 6);        //coba lagi
        //blob('test_blob', 10);                    //bisa digunakan tanpa length
        //longblob('field_longblob', 2);           //coba lagi
        //enums('coba_enums', 2);                       //coba lagi
        //set('coba_set', 2), unique();                           //coba lagi
        //geometry('coba_geometry', 10);             //bisa digunakan tanpa length
        //point('coba_point', 8);                      //bisa digunakan tanpa length
        //linestring('coba_linestring', 10);              //bisa digunakan tanpa length
        //polygon('tst_polygon', 7);                      //bisa digunakan tanpa length
        //multipoint('coba_multipoint', 9);               //bisa digunakan tanpa length
        //multilinestring('coba_multilinestring', 10);     //bisa digunakan tanpa length
        //multipolygon('tst_multipolygon', 22);              //bisa digunakan tanpa length
        //geomtrycollection('tst_geometrycollection', 6);      //coba lagi

    }
};

module.exports.update = {
    'blueprint': function () {
        column('desimal'), varchar('desimal', 50); //! Just update type column / Rename!
        addColumn(), varchar('no_tlp', 12), nullable(); //! For add column !
        addIndex(), index(['desimal'], 'idx_desimal'); //! For add index with custom name index !
        addIndex(), index(['nama_prodi']); //! For add index without custom name index !
    }
};

module.exports.delete = {
    'blueprint': function () {
        //dropColumn('no_tlp');
        //dropIndex('idx_desimal');
        //dropPrimary();
        dropTable('prodi');
    }
};