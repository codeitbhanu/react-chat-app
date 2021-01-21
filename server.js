const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
    socket.emit("your-id", socket.id); //socket id is unique, this is telling the user connected about his socket id
    console.log(`Client Connected: ${socket.id}`);
    socket.on("send-message", (body, id) => {
        console.log(`Person: ${id} Sending ${body}`);
        io.emit("message", body);
    });
});

server.listen(PORT, () =>
    console.log("Server is running on http://localhost:" + PORT)
);
