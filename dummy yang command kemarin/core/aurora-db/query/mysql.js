let component = [];
var table_name = "";
/*contoh mau kaya gini
CREATE TABLE rooms (
    room_no INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(255) NOT NULL,
    building_no INT NOT NULL,
    FOREIGN KEY (building_no)
        REFERENCES buildings (building_no)
        ON DELETE CASCADE
);

*/
function get_schema(){

}

function create_table(){
    return ;
}

function create(text){
    return console.log(text);
}

module.exports.create = create;  