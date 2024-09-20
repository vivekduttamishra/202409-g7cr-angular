const mongoose = require('mongoose');
require('dotenv').config();

var user=process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD;
var database = process.env.MONGODB_BOOKSDB
var dbServer=process.env.MONGODB_BOOKSDB_SERVER;

//console.log('database',database);

 
var url=`mongodb+srv://${user}:${password}@${dbServer}/${database}`;




async function connect(){
   // console.log('connecting to ' ,url);
    await mongoose.connect(url);
}

async function disconnect(){
    await mongoose.disconnect();
}


// (async()=>{
//     try{
//         console.log('connecting to ', url);
//         await connect();
//         console.log('Connected to MongoDB');
//     }catch(e){
//         console.log('error',e.message)
//     }
// })();



module.exports={
    connect,
    disconnect,
};