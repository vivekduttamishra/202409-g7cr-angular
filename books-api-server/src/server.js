require('dotenv').config(); //read .env file and merge into process.env

var http = require('http');
var createApp = require('./app');

const PORT = parseInt(process.env.PORT ?? 80);
const SERVER = 'localhost';

(async function () {
    let app = await createApp();

    var server = http.createServer(app);

    require('./sockets/room-broadcast.socket')(server); //add the broadcast socket

    server.on('error', error => console.error(`Error starting server: ${error.message}`));
    server.on('listening', () => console.log(`Server started: http://${SERVER}:${PORT}`));
    // console.log('process.env.MONGODB_BOOKSDB',process.env.MONGODB_BOOKSDB);

    server.listen(PORT)
})();




