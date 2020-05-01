// import Express from 'express';
const  Express = require('express');

// import crdb from  ('./createDB.js');
var dbfunc =require('./createdb.js');
var http = require('http');
var https = require('https');
var sqlite3 = require('sqlite3').verbose()



// var db = new sqlite3.Database('game.db')
// check if DB exists, else create or use as read only conn
// var dbro = new sqlite3.Database(game.db,sqlite3.OPEN_READWRITE, (err) => {

let dbRO = new sqlite3.Database('game.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    if(err.errno ==14){
      console.log('Creating Database....')
      dbfunc.createDB("game.db")
      
    }
    // Create new DB and DB tables
    console.error(err, "Unable to connect to DataBase");
  }else {console.log('Connected to  database: game.db');}
  
});
dbRO.close()

const nodeServer = Express();
const hostname = '127.0.0.1';
const port = 5000;

nodeServer.get('/', (req,res)=>{
    console.log(req.route)
    //
    let db = new sqlite3.Database('game.db', sqlite3.OPEN_READWRITE, (err) => {});
    db.serialize(function () {
      
        db.run(' CREATE TABLE IF NOT EXISTS lorem (info TEXT, date_time TEXT)')
        var stmt = db.prepare('INSERT INTO lorem VALUES (?,datetime("now"))')
        for (var i = 0; i < 10; i++) {
          stmt.run(('Ipsum ' + i))
        }
        stmt.finalize() 
         
        // db.run('INSERT INTO lorem  VALUES (datetime("now"),datetime("now", "localtime"))')
        db.each('SELECT rowid AS id, info FROM lorem', function (err, row) {
          console.log(row.id + ': ' + row.info)
        })
      })
      db.close()
    
    // 
    res.sendfile("./bunnybut.gif")
}) // get'/'

      
      
nodeServer.get('/score', (req,res)=>{
    // console.log(req.route)
    let qresult = '';
    let db = new sqlite3.Database('game.db', sqlite3.OPEN_READWRITE, (err) => {});
    db.all('SELECT * FROM lorem', function (err, row) {
      // console.log(row.id + ': ' + row.info, row.date_time)
      console.log("row: ",row)
      console.log('qresult: ',qresult)
      qresult= (row) 
    
     
  db.close() 
    // res.send("Select state.score from DB")
    res.send(qresult)
    // res.send(JSON.parse(qresult))
  })
 
  
  

})
    
nodeServer.listen(port,hostname, 
    ()=>{console.log('Node Server Listening on port'+port)}) 


