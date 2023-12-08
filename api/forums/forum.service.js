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
            `select id, title, content, image, created_at from forums`,
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
        pool.query('SELECT id AS forum_id, title, content AS forum_content, image AS forum_image, created_at AS forum_created_at FROM forums WHERE id = ?', 
        [id], 
        (error, results, fields) => {
            if (error) {
                return callBack(error);
            }
            forumResult = results;
        
            // Query untuk tabel replies
            pool.query('SELECT id AS reply_id, user_id AS reply_user_id, content AS reply_content, image AS reply_image, created_at AS reply_created_at FROM replies WHERE forum_id = ?', 
            [id], 
            (error, results,fields) => {
                if (error) {
                    return callBack(error);
                }
                repliesResult = results;
        
                // Menggabungkan hasil query pertama dan kedua
                const result = {
                    forum: forumResult,
                    replies: repliesResult
                };

                // Mengembalikan hasil gabungan
                return callBack(null, forumResult, repliesResult);
            });
        });
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