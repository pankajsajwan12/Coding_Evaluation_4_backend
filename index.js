const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var cors = require('cors')

const {connection} = require("./config/server");
const {UserModel} = require("./models/User.model");
const {authentication} = require("./middlewares/authentication");
const {todoRouter} = require("./routes/todo.routes")

require("dotenv").config();
const app = express();

const port = process.env.port

app.use(express.json())
app.use(cors())


app.post("/signup",async (req,res) => {
    const {email, password, name} = req.body;
    
    const isUser = await UserModel.findOne({email})
    if(isUser) {
        return res.send({"msg" : "User already exists, try login in"})
    }
    bcrypt.hash(password , 8, async(err,hash) => {
        if(err) {
           return res.send({"msg" : "Something went wrong , please try again later"})
        }

        const new_user = new UserModel({
            name,
            email,
            password : hash,
        })

        try{
            await new_user.save();
            res.send({"msg" : "Singup successfully"})
        }
        catch(err) {
            console.log(err)
            res.send({"msg" : "Something went wrong, please try again"})
        }

    });
 })

 app.post("/login", async(req,res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hash_password = user.password

    bcrypt.compare( password , hash_password, (err,result) => {
        if(err) {
          return  res.send({"msg" : "Something went wrong, please try again later"});
        }
        if(result) {
            const token = jwt.sign({ userId : user._id}, process.env.secret_key)
           return  res.send({"msg" : "Login successfully", token , userId : user._id})
        } else {
           return  res.send({"msg" : "Invalid credentials"})
        }
    })
 })


 app.use(authentication);
 app.use("/todos", todoRouter)

app.listen(port , async(req,res) => {
   try{
       await connection
       console.log("App is connect with mongodb");
   }
   catch(err) {
       console.log("App is not connect with mongodb");
       console.log(err);
   }
   console.log(`App is listing ${port}`);
})