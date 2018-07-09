var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var rooms = require('./data/rooms.json');
var uuid = require('node-uuid');
var app = express();
var _ = require('lodash');

app.set("views", "./views");
app.set("view engine","jade");


app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'admin')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req, res)=>{
  res.render('index',{title : "Home"});
});

app.get('/admin/rooms',(req, res)=>{
  res.render('rooms',{
    rooms : rooms,
    title : "Admin Room"});
});


app.get('/admin/rooms/add',(req,res)=>{
  res.render("add");
});

app.post('/admin/rooms/add',(req,res)=>{
  var room = {
    name: req.body.name,
    id: uuid.v4()
  };

  rooms.push(room);
  res.redirect("/admin/rooms");
});

app.get('/admin/rooms/edit/:id',(req,res)=>{
  var roomId = req.params.id;
  var room  = _.find(rooms, r=> r.id ==roomId);
  if(!room){
    res.sendStatus(404);
    return;
  }
  res.render('edit',{room});
});

app.post('/admin/rooms/edit/:id',(req,res)=>{
  var roomId = req.params.id;
  var room  = _.find(rooms, r=> r.id ==roomId);
  if(!room){
    res.sendStatus(404);
    return;
  }
  room.name = req.body.name;
  res.redirect("/admin/rooms");
});

app.get('/admin/rooms/delete/:id',(req,res)=>{
  var roomId = req.params.id;
  rooms  = rooms.filter(r=> r.id !=roomId);
  res.redirect("/admin/rooms");
});

app.listen(3000,()=>{
  console.log("Chat app is listening on port number 3000!")
})
