const pool = require("../../config/database");

module.exports= {
    //registration
    create :(data, callBack) => {
        pool.query(
            `insert into user (name, email, password) values(?,?,?)`,
            [
                data.name,
                data.email,
                data.password
            ],
            (error, results, fields) =>{
                if (error){
                   return callBack(error);
                }
                return callBack (null, results);
            }
        );
    },

    //getAllUser, tp kita gabutuh sii, tes buat operasi crud yg lain
    getUsers: callBack=>{
        pool.query(
            `select id, name, email from user`,
             [],
             (error, results, fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null, results);
             }
        )
    },

    //getUserbyId
    getUserbyID: (id, callBack)=>{
        pool.query(
            `select id, name, email from user where id = ?`,
             [id],
             (error, results, fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
             }
        );
    },

    updateUser :(data, callBack) => {
        pool.query(
            `update user set name=?, email=?, password=? where id=?`,
            [
                data.name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) =>{
                if (error){
                   return callBack(error);
                }
                return callBack (null, results[0]);
            }
        );
    },

    deleteUser :(data, callBack) => {
        pool.query(
            `delete from user where id=?`,
            [data.id],
            (error, results, fields) =>{
                if (error){
                   return callBack(error);
                }
                return callBack (null, results[0]);
            }
        );
    },
};