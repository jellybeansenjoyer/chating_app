const express = require("express");
const dotenv = require('dotenv');
const colors = require('colors')
const connectDb = require('./config/db')
const chatRoutes = require('./routes/chatRoutes');
const messageRouters = require('./routes/messageRoutes');
dotenv.config();
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
connectDb();
const app = express();
app.use(express.json()); //to access json data
app.get('/', (req, res) => {
    res.status(200).send("API is Running");
});
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRouters)
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 4000

const server = app.listen(PORT, console.log(`Server started at PORT ${PORT}`.yellow.bold))
const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000",
    }
});

io.on("connection",(socket)=>{
    console.log("Connected to socket.io".yellow.bold);
    socket.on('setup',(userData)=>{
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");  
    })

    socket.on('join chat',(room)=>{
       socket.join(room);
       console.log("User Joined Room: " + room);
    });

    socket.on('new message',(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log('chat.users not defined');
        chat.users.forEach((user) => {
           if(user._id===newMessageRecieved.sender._id) return;
           
           socket.in(user._id).emit("message recieved",newMessageRecieved);
        });
    })

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
  socket.off("setup",()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
})
})
