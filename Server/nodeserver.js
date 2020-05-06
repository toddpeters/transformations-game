
const  Express = require('express');
var bodyparser = require('body-parser')
const CORS = require('cors');

// import crdb from  ('./createDB.js');
var dbfunc =require('./createdb.js');
var http = require('http');
var https = require('https');
var sqlite3 = require('sqlite3').verbose()

const dbname = 'game.db'

// var jsonparser = bodyparser.json()


// var db = new sqlite3.Database('game.db')
// check if DB exists, else create or use as read only conn
// var dbro = new sqlite3.Database(game.db,sqlite3.OPEN_READWRITE, (err) => {

let dbRO = new sqlite3.Database(dbname, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    if(err.errno ==14){
      console.log('Creating Database....')
      dbfunc.createDB(dbname)
      
    }
    // Create new DB and DB tables
    console.assert(err, "Unable to connect to DataBase");
  }else {console.log('Connected to  database: game.db');}
  
});
dbRO.close()

const nodeServer = Express();
const hostname = '127.0.0.1';
const port = 5000;

//  to avoid CORS errors
nodeServer.use(CORS())
nodeServer.use(bodyparser.json()) 

nodeServer.get('/', (req,res)=>{
    console.log(req.route)
    //
    let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE, (err) => {});
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
    let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE, (err) => {});
    db.all('SELECT * FROM lorem', function (err, row) {
      // console.log(row.id + ': ' + row.info, row.date_time)
      console.log("row: ",row)
      console.log('qresult: ',qresult)
      qresult= (row) 
    
      // res.send("Select state.score from DB")
      res.send(qresult)
      // res.JSON.parse(qresult)
    })
   db.close() 
    
  })
     
  nodeServer.post('/register', (req,res)=>{
    
    let udata = req.body
    console.log("userdata :", udata)
    //
    let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE, (err) => {
      if(err){
        console.error(err,  dbname +'not reachabe for  ReadWrite')
      }
    });
    db.serialize(function () { // retained to add susbequent queries needed
      let sql = `INSERT INTO users (userid, email, password, reg_at) VALUES ((?), (?), (?), datetime("now"))`
      let params = [udata.UserName, udata.UserEmail, udata.UserPassword]
       db.run(sql, params,(err)=>{
        if(err){
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`Insert Successful. Row ID: ${this.lastID}, ${udata.UserName}`);
      });
    })
    db.close()
    res.send({status:200})
        

}) // POST '/register'
  

    
nodeServer.listen(port,hostname, 
    ()=>{console.log('Node Server Listening on port :'+port)}) 


