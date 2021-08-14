var express = require('express');
import express from 'express';
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main_maker'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3702)


app.get('/', function(req,res,next){
  var context = {};
  mysql.pool.query('SELECT * FROM Makers', function(err,rows,fields){
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
  mysql.pool.query('DELETE FROM Makers WHERE maker_id=?', [req.query.maker_id], function(err,result){
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
  mysql.pool.query("INSERT INTO Makers (`first_name`, `last_name`, `phone_num`, `location_id`) VALUES (?,?,?,?,?)", [req.query.first_name, req.query.last_name, req.query.phone_num, req.query.location_id], function(err, result){
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
  mysql.pool.query("UPDATE Makers SET first_name=?, last_name=?, phone_num=?, location_id=? WHERE maker_id=?",
    [req.query.first_name, req.query.last_name, req.query.phone_num, req.query.location_id, req.query.maker_id],
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
  mysql.pool.query("DROP TABLE IF EXISTS Makers", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE Makers("+
    "maker_id INT PRIMARY KEY AUTO_INCREMENT,"+
    "first_name VARCHAR(255) NOT NULL,"+
    "last_name VARCHAR(255) NOT NULL,"+
    "phone_num INT,"+
    "location_id INT,";
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


