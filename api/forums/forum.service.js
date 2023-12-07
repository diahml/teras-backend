const pool = require("../../config/database");

module.exports={
    createForum:(data,callBack)=>{
        pool.query(
            `insert into forums (user_id, title, content, image) values (?,?,?,?)`,
        [
            data.user_id,
            data.title,
            data.content,
            data.image
        ],
        (error, results, fields) =>{
            if (error){
               return callBack(error);
            }
            return callBack (null, results);
        }
        );
    },

    getForum: callBack=>{
        pool.query(
            `select id, user_id, title, content, image, created_at from forums`,
             [],
             (error, results, fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null, results);
             }
        )
    },

    getForumbyID: (id, callBack)=>{
        pool.query(
            `select id, user_id, title, content, image, created_at from forums where id = ?`,
             [id],
             (error, results, fields)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
             }
        );
    },

    reply :(forum_id, data, callBack)=>{
        pool.query(
            `insert into replies (forum_id, content, image, user_id) values (?,?,?,?)`,
            [
                forum_id,
                data.content,
                data.image,
                data.user_id,
            ],
            (error, results, fields) =>{
                if (error){
                   return callBack(error);
                }
                return callBack (null, results);
            }
        );
    },
}