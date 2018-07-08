var express = require('express');
var path = require('path');
var rooms = require('./data/rooms.json')
var app = express();

app.set("views", "./views");
app.set("view engine","jade");
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'admin')));


app.get('/',(req, res)=>{
  res.render('index',{title : "Home"});
});

app.get('/admin/rooms',(req, res)=>{
  res.render('rooms',{
    rooms : rooms,
    title : "Admin Room"});
});



app.listen(3000,()=>{
  console.log("Chat app is listening on port number 3000!")
})
