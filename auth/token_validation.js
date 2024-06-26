const jwt = require("jsonwebtoken");

module.exports = {
    checkToken: ( req, res, next) =>{
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            jwt.verify(token, 'qwe123', (err, decoded)=>{
                if(err){
                    res.status(401).json({
                        success:0, 
                        message:"Invalid token",
                    });
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }else{
            res.status(401).json({
                success:0,
                message: "Access Denied! Unauthorized user"
            });
        }
    }
}