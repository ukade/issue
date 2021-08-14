var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3702)



app.get('/', function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err,rows,fields){
    if (err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.render('home', context)
  })
})

app.get('/delete', function(req,res,next){
  var context = {};
  mysql.pool.query('DELETE FROM workouts WHERE id=?', [req.query.id], function(err,result){
    if (err){
      next(err);
      return;
    }
    context.results = "Deleted" + result.changedRows +"rows.";
    res.render('home', context)
  })
})


app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (`exercise`, `reps`, `weight`, `date`, `unit`) VALUES (?,?,?,?,?)", [req.query.exercise, req.query.reps, req.query.weight, req.query.date, req.query.unit], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});

app.get('/simple-update',function(req,res,next){
  var context = {};
  mysql.pool.query("UPDATE workouts SET exercise=?, reps=?, weight=?, date=?, unit=? WHERE id=?",
    [req.query.exercise, req.query.reps, req.query.weight, req.query.date, req.query.unit, req.query.id],
    function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Updated " + result.changedRows + " rows.";
    res.render('home',context);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.listen(app.get('port'), function(){  // terminate notice ran on node.js when entering port server
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
