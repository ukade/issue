var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port',3368);

app.get('/hw5',function(req,res){
  var val = [];
  for (var a in req.query){
    val.push({'nameget' : a, 'valueget' : req.query[a]});
  }
  var string = "GET Request Received";
  var context = {};
  context.dataListget = val;
  context.getrequest = string;
  res.render('get.handlebars',context);
});

app.post('/hw5',function(req,res){
  var val = [];
  for (var a in req.body){
    val.push({"namepost1" : a, "valuepost1" : req.body[a]})
  }
  var val2 = [];
  for (var b in req.query){
    val2.push({"namepost2" : b, "valuepost2" : req.query[b]})
  }
  var string = "POST Request Received";
  console.log(val);
  console.log(req.body);
  console.log(req.query);
  var context = {};
  context.postrequest = string;
  context.dataListpost2 = val2;
  context.dataListpost1 = val;
  res.render('get.handlebars', context);
  });



app.use(function(req,res){
  res.status(404);
  res.render('404');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
