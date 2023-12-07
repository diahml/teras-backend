const pool = require("../../config/database");

module.exports= {
    //registration
    create :(data, callBack) => {
        pool.query(
            `insert into user (name, email, address, password) values(?,?,?,?)`,
            [
                data.name,
                data.email,
                data.address,
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
            `select id, name, email, address from user`,
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
            `select id, name, email, address from user where id = ?`,
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
            `update user set name=?, email=?, address=?, password=? where id=?`,
            [
                data.name,
                data.email,
                data.address,
                data.password,
                data.id
            ],
            (error, results, fields) =>{
                if (error){
                   return callBack(error);
                }
                if (results.affectedRows === 0) {
                    // no affected rows mean data not found
                    return callBack(null, null);
                }
                return callBack (null, results);
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

    getUserbyUserEmail: (email,callBack) =>{
        pool.query(
            `select * from user where email = ?`,
            [email],
            (error, results, fields) =>{
                if (error){
                    callBack(error);
                }
                return callBack (null, results[0]);
            }
        );
    },

    // readPrediction: callBack=>{
    //     pool.query(
    //         `select province, status FROM prediction_result`,
    //          [],
    //          (error, results, fields)=>{
    //             if (error){
    //                 console.error("Error executing query:", error);
    //                 return callBack(error);
    //             }
    //             console.log("Results:", results);
    //             return callBack(null, results);
    //          }
    //     );
    // },
};