const { createForum, getForum, reply, getForumbyID} = require("./forum.service");

module.exports={
    createForum:(req,res)=>{
        const body= req.body;
        createForum(body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results,
                message:"OK",
            });
        });
    },

    getForum:(req,res)=>{
        getForum((err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.status(200).json({
                success:1,
                data:results,
                message:"OK",
            });
        });
    },

 
    getForumbyID: (req, res)=>{
        const id = req.params.id;
        getForumbyID(id, (err, forumResult, repliesResult)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!forumResult){
                return res.status(404).json({
                    success:0,
                    message: "Record not Found"
                });
            }
            return res.status(200).json({
                success : 1,
                forum:forumResult, 
                replies:repliesResult,
                message:"OK"
            });
        });
    },

    reply:(req,res)=>{
        const forum_id = req.params.forum_id;
        const body = req.body;
        reply(forum_id, body, (err, results)=> {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success:1,
                data:results,
                message:"OK"
            });
        });
    },
}