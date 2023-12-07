const pool = require("../../config/database");

module.exports={
    //read prediction
    readPrediction: callBack=>{
        pool.query(
            `select province, status FROM prediction_result`,
             [],
             (error, results, fields)=>{
                if (error){
                    console.error("Error executing query:", error);
                    return callBack(error);
                }
                console.log("Results:", results);
                return callBack(null, results);
             }
        );
    },
}