const  Express = require('express');
var sqlite3 = require('sqlite3').verbose()

const dbfunc = {
    createDB :(dbase,err)=> {
        let db = new sqlite3.Database("./"+dbase,(err,()=>{
            if(err){
                console.error((err.errno +' : ', err.code , 'encountered. Could not create Database '+dbase));
            }
            console.log("Database game.db created")
        }))

        

    // check if DB is accessible and then create tables inside the serialize()

    // db.serialize(function () {})

}

// function test() {
//     console.log("recognized as Function")
// }
}


module.exports = dbfunc