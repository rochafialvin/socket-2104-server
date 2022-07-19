const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});

// http
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// websocket
io.on("connection", (socket) => {
  // create event listener untuk join room
  socket.on("join-room", (data) => {
    // data : { username: ... , room: ... }
    const { username, room } = data;
    socket.join(room);

    const message = { body: `${username} has joined` };

    io.to(room).emit("recieve-message", message);
  });

  // Menerima pesan yang dikirim dari client
  socket.on("send-message", (message) => {
    // Trigger event pada room tertentu / Mengirim pesan ke room tertentu
    io.to(message.room).emit("recieve-message", message);
  });
});

httpServer.listen(2104, () => {
  console.log("Server running at 2104");
});
