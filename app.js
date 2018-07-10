var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');

var app = express();


app.set("views", "./views");
app.set("view engine","jade");


app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'admin')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
  res.render('index',{title : "Home"});
});

var adminRouter = require('./admin');

app.use('/admin',adminRouter);
app.listen(3000,()=>{
  console.log("Chat app is listening on port number 3000!")
})
