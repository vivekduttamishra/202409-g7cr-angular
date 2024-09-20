require('dotenv').config(); //read .env file and merge into process.env
const cluster = require('cluster');
const os = require('os');


console.log(`process started: ${process.pid}`)

if (cluster.isMaster) {
    const cpuCount = os.cpus().length;
    for (let i = 0; i < cpuCount; i++) {
        cluster.fork(); //create new process
    }

    cluster.on('exit',(exitedProcess)=>{
        console.log(`Process ${exitedProcess.process.pid} died`);
        cluster.fork(); //restart process
    })

} else {

    require('./server');

}




