module.exports.create = {
    'table_name': 'prodi',
    'engine': 'innoDB',
    'blueprint': function () {
        // increment('id');
        integer('id'), primary();
        varchar('nama_prodi', 100);
        decimal('desimal');
        float('field_float');          //length ga bisa
        //double('field_double');      //TANPA LENGTH BISA
        //real('field_real', 25);              //TANPA LENGTH BISA
        //bit('field_bit', 6);                //table date & length bisa digunakan
        //boolean('field_boolean');         //TANPA LENGTH BISA
        //serial('field_serial');              //serial harus tanpa length dan serial itu auto increment
        //Date('field_date', 10);              //table date dan length bisa digunakan
        //datetime('field_datetime', 4);      //bisa digunakan
        //timestamp('timestamp', 6);          //bisa digunakan
        //time('time', 6);                   //bisa digunakan
        //year('field_year', 10);            //length tidak dapat digunakan dan auto increment
        //char('field_char', 10);            //KARENA C BESAR
        varchar('field_varchar', 10);      //bisa digunakan
        //tinytext('field_tinytext');     //TANPA LENGTH BISA
        //text('field_text', 10);            //dapat digunakan tapi tidak terbaca lengthnya atau text tidak terbatas
        //mediumtext('field_mediumtext');  //TANPA LENGTH BISA
        longtext('bisa_longtext');             //dapat digunakan tapi tidak bisa menggunakan lengthnya
        //binary('field_binary', 10);           //bisa digunakan
        //varbinary('coba_varbinary', 10);        //bisa digunakan
        //tinyblob('field_tinyblob');          //TANPA LENGTH BISA
        //mediumblob('coba_mediumblob');        //TANPA LENGTH BISA
        //blob('test_blob');                    //bisa digunakan tanpa length
        //longblob('field_longblob', 2);           //TANPA LENGTH BISA
        //enums('coba_enums',"'Low', 'Medium', 'High'");                       //VALUENYA HARUS BERUPA STING DAN KOMA SEBAGAI PEMISAHNYA
        //set('coba_set',"'a', 'b', 'c', 'd'");                          //VALUENYA HARUS BERUPA STING DAN KOMA SEBAGAI PEMISAHNYA
        //geometry('coba_geometry', 10);             //bisa digunakan tanpa length
        //point('coba_point', 8);                      //bisa digunakan tanpa length
        //linestring('coba_linestring', 10);              //bisa digunakan tanpa length
        //polygon('tst_polygon', 7);                      //bisa digunakan tanpa length
        //multipoint('coba_multipoint', 9);               //bisa digunakan tanpa length
        //multilinestring('coba_multilinestring', 10);     //bisa digunakan tanpa length
        //multipolygon('tst_multipolygon', 22);              //bisa digunakan tanpa length
        //geometrycollection('tst_geometrycollection', 6);      //KARENA SALAH MANGGIL FUNCTION

    }
};

module.exports.update = {
    'blueprint': function () {
        //column('desimal'), varchar('desimal', 50); //! Just update type column / Rename!
        //addColumn(), varchar('no_tlp', 12), nullable(); //! For add column !
        //addIndex(), index(['desimal'], 'idx_desimal'); //! For add index with custom name index !
        //addIndex(), index(['nama_prodi']); //! For add index without custom name index !

        //
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