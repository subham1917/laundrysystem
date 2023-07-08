const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());



mongoose.connect("mongodb://localhost:27017/laundry", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(res => {
  console.log('success');
}).catch(err => {
  console.log('error')
})

// const connectionStr = "mongodb://localhost:27017/mynewdb";

// mongoose.connect(connectionStr, {useNewUrlparser: true})
// .then(() => console.log('connected to mongodb'))
// .catch(err => console.log(err))

// mongoose.connection.on('error', err => {
//   console.log(err)
// })

const userSchema = {


  name: String,
  username: String,
  email: String,
  phone: String,
  password: String,
  role: String

}
const monmodel = mongoose.model("NewCol", userSchema);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.post("/post", async (req, res) => {

  //   console.log("inside post function");

  const data = new monmodel({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    role: "1"
  });
  console.log(data);
  const val = await data.save();
  if (val)
    res.send({ msg: "registartion done" });
  else
    res.send({ msg: "something went wrong" })

})

app.post('/login', function async(req, res) {
  var result = "";
  var chk = {};
  console.log(req.body);
  // const data= monmodel.findOne({ email: req.body.email, password: req.body.password });
  // console.log(data,"111111");
  monmodel.findOne({ email: req.body.email, password: req.body.password }).then(res => {
    console.log(res)
    if (res) {
      chk = res;
      result = "valid email-id or password";
      console.log('aaa')
    }
    else {
      result = "in-valid email-id or password";
      console.log('bbb')

    }
  });
  setTimeout(() => {
    console.log(result);
    res.send({ "msg": result, value: chk });
    // res.json(result)
  }, 100);
})

const userformSchema = {


  customername: String,
  pickupdate: String,
  deliverydate: String,
  laundrytype: String,
  quantity: String,
  instructions: String,
  status: String

}
const monmodel1 = mongoose.model("userform", userformSchema);

app.post("/userform", async (req, res) => {

  //   console.log("inside post function");

  const data = new monmodel1({

    customername: req.body.customername,
    pickupdate: req.body.pickupdate,
    deliverydate: req.body.deliverydate,
    laundrytype: req.body.laundrytype,
    quantity: req.body.quantity,
    instructions: req.body.instructions,
    status: req.body.status

  });
  console.log(data);
  const val = await data.save();
  if (val)
    res.send({ msg: " order placed" });
  else
    res.send({ msg: "something went wrong" })

})




app.listen(8000, () => {
  console.log("on port 8000")
})
