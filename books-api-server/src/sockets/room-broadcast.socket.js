
const socketIo = require('socket.io');


const setup=(httpServer)=>{
    const io = socketIo(httpServer, {
        cors: {
          origin: 'http://localhost:4200', // Your Angular app's URL
          methods: ['GET', 'POST']
        }
      });

    io.on('connection', (socket) => {
      console.log('New client connected');
    
      // Join a room for the specific book
      socket.on('joinRoom', (bookId) => {
        socket.join(bookId);
        console.log(`Client joined room: ${bookId}`);
      });
    
      // Broadcast a message to all clients in the same room
      socket.on('sendMessage', (bookId, message) => {
        io.to(bookId).emit('receiveMessage', message);
      });
    
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
}


module.exports=setup;
