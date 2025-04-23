const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server); //yh fun hai

app.set('view-engine', 'ejs');
app.set('views', "./views");
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("Hii");
})

server.listen(3000, () => {
    console.log("Server Started on 3000");
})