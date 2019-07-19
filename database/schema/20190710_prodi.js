module.exports.create = {
    'table_name': 'prodi',
    'engine': 'innoDB',
    'blueprint': function () {
        increment('id');
        varchar('nama_prodi', 100), unique();
        decimal('desimal');
        //  float('field_float', 10);          //length ga bisa
        //double('field_double', 2, (6));      //coba lagi
        //real('field_real', 25);              //coba lagi
        //bit('field_bit', 10);                //table date & length bisa digunakan
        //boolean('field_boolean', 7);         //coba lagi
        //serial('field_serial');              //serial harus tanpa length dan serial itu auto increment
        //Date('field_date', 10);              //table date dan length bisa digunakan
        //datetime('field_datetime', 4);      //bisa digunakan
        //timestamp('timestamp', 6);          //bisa digunakan
        //time('time', 6);                   //bisa digunakan
        //year('field_year', 10);            //length tidak dapat digunakan dan auto increment
        //Char('field_char', 10);            //coba lagi
        //varchar('field_varchar', 10);      //bisa digunakan
        //tinytext('field_tinytext', 2);     //coba lagi
        //text('field_text', 10);            //dapat digunakan tapi tidak terbaca lengthnya atau text tidak terbatas
        //mediumtext('field_mediumtext', 10);  //coba lagi
        longtext('bisa_longtext');             //dapat digunakan tapi tidak bisa menggunakan lengthnya

    }
};