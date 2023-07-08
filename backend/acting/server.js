const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());


 


const connectionStr = "mongodb://localhost:27017";

mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
    
const userSchema = {
    
        
        name: String,
        username:String,
        email:String,
        phone:String,
        password:String,
      
}
const monmodel = mongoose.model("NewCol", userSchema);