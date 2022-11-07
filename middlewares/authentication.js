
 const jwt = require("jsonwebtoken");
 require('dotenv').config();

 const authentication = (req,res,next) => {
    if(!req.headers.authorization) {
        return res.send({"msg": "Your are not authorization person"})
    } 

    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.secret_key, (err, decode) => {
        if(err) {
            return res.send({"msg" : "Please try again later"})
        } else {
            console.log("decode", decode)
            next();
        }
    });
 }

 module.exports = {
    authentication
}