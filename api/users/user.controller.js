const { create, getUserbyID, getUsers, updateUser, deleteUser } = require("./user.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
    //registration
    createUser: (req,res)=>{
        const body = req.body;

        const salt = genSaltSync(10);//to hash the password
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=> {
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
            });
        });
    },

    getUserbyID: (req, res)=>{
        const id = req.params.id;
        getUserbyID(id, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success : 1,
                data:results
            });
        });
    },

    getUsers:(req,res)=>{
        getUsers((err, results)=>{
            if(err){
                console.lof(err);
                return;
            }
            return res.status(200).json({
                success:1,
                data:results
            });
        });
    },

    updateUser: (req,res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser (body, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message:"failed to update user"
                });
            }
            return res.status(200).json({
                success:1,
                message :"update successfully"
            });
        });
    },

    deleteUser: (req, res)=>{
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.status(404).json({
                    success:0,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success:1,
                message:"User deleted successfully"
            });
        });
    }
}