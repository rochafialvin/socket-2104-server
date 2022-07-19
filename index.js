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
  // create event listener
  socket.on("kirimpesan", (data) => {
    // data : {pesan : "Hello"}
    console.log(`seseorang telah mengirim pesan : ${data.pesan} `);
  });
});

httpServer.listen(2104, () => {
  console.log("Server running at 2104");
});
