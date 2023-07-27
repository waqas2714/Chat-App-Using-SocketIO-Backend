const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();
const userRouter = require('./Routes/userRoutes');
const messagesRouter = require('./Routes/messagesRoute');
const socket = require('socket.io')


app.use(cors());
app.use(express.json());
app.use("/api/auth",userRouter);
app.use("/api/messages",messagesRouter);

const port = process.env.PORT;
const server = app.listen(port,()=>{
    console.log(`Server created on port ${port}`);
})

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB Connected!");
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
});
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });