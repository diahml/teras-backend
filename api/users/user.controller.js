const { create, getUsers, getUserbyID, updateUser, deleteUser, getUserbyUserEmail } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");

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

    getUsers:(req,res)=>{
        getUsers((err, results)=>{
            if(err){
                console.log(err);
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
            else if (!results) {
                return res.status(404).json({
                  success: 0,
                  message: "User not found"
                });
            }
            return res.status(200).json({
                success:1,
                message :"updated successfully"
            });
        });
    },

    login:(req, res) =>{
        const body = req.body;
        getUserbyUserEmail(body.email, (err, results)=>{
            if(err) {
                console.log(err);
            }
            if(!results) {
                return res.json({
                    success : 0,
                    data : "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonwebtoken = sign({result : results},process.env.JSON_KEY, {
                    expiresIn :"1h"
                });
                return res.json({
                    sucess:1,
                    message:"Login Successfully",
                    token:jsonwebtoken
                });
            }else{
                return res.json({
                    sucess:0,
                    message:"Invalid email or password"
                });
            }
        });
    },

    //read prediction result
    // readPrediction:(req,res)=>{
    //     readPrediction((err, results)=>{
    //         if(err){
    //             console.log(err);
    //             return;
    //         }
    //         return res.status(200).json({
    //             success:1,
    //             data:results
    //         });
    //     });
    // },

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
                    message: "Record not Found"
                });
            }
            return res.status(200).json({
                success : 1,
                data:results
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
    },
};