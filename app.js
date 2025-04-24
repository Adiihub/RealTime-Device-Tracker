const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');
// const { isPromise } = require('util/types');

const server = http.createServer(app);
const io = socketio(server); //yh fun hai

app.set('view engine', 'ejs');
// app.set('views', "./views");
app.use(express.static("public"));


io.on('connection', (socket) => {
    console.log("connected");
    socket.on("send-location", (data) => {
        io.emit("Receive-Location", {id : socket.id, ...data});
    })
    socket.on("disconnect", () => {
        io.emit("User-Disconnected", socket.id);
    })
})



app.get("/", (req, res) => {
    res.render('index');
})

server.listen(3000, () => {
    console.log("Server Started on 3000");
})