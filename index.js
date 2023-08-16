const express = require('express')
const cors = require('cors')
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
require('dotenv').config()

const app = express();
app.use(cors());

app.get('/tasks', (req, res) => {
    res.send([
        { description: 'Build IVR tool', assignee: 'Jay' },
        { description: 'Build Externals API', assignee: 'Greg' },
    ])
});

app.use(express.static(path.join(__dirname, `../frontend/build`)));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, `../frontend/build`, 'index.html'))
});

const server = http.createServer(app);
const io = socketIO(server, {
    maxHttpBufferSize: 1e8,
    cors: { origin: `*` },
});
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle events from the client
    socket.on('getUser', (cb) => cb(['Andy', 'Greg', 'Jay', 'Mac', 'Jhe', 'Alexus']));

    // Handle disconnections
    socket.on('disconnect', () => console.log('A user disconnected'))
});


const port = process.env.PORT

server.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`)
})