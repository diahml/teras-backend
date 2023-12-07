const { readPrediction } = require("./prediction.service");

module.exports = {
    readPrediction: (req,res)=>{
        readPrediction((err, results)=>{
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
};