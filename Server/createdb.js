const  Express = require('express');
var sqlite3 = require('sqlite3').verbose()

const dbfunc = {
    createDB :(dbase,err)=> {
        let dbCr = new sqlite3.Database("./"+dbase,(err,()=>{
            if(err){
                console.error((err.errno +' : ', err.code , 'encountered. Could not create Database '+dbase));
            }
            console.log("Database game.db created")
        }))
        dbCr.close()
    

    // check if DB is accessible and then create tables inside the serialize()
    let db = new sqlite3.Database("./"+dbase,(err,()=>{
         // db.serialize(function () {})
         db.serialize(()=>{
            db.run(' CREATE TABLE IF NOT EXISTS users (userid TEXT, password TEXT ,email TEXT , reg_at TEXT)')

            

         })
         db.close()
    })
    )

   

}

// function test() {
//     console.log("recognized as Function")
// }
}


module.exports = dbfunc