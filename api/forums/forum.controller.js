const { createForum, getForum, reply, getForumbyID} = require("./forum.service");
const Multer = require('multer');
const imgUpload = require("../../modules/imgUpload.js");

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
})

module.exports={
    createForum:[multer.single('attachment'), imgUpload.uploadToGcs, (req,res)=>{
        const body= req.body;

        if (req.file && req.file.cloudStoragePublicUrl) {
            body.image = req.file.cloudStoragePublicUrl
        }
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
    }],

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