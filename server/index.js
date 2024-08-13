const express = require('express')
const app = express()
const cors = require("cors")
const http = require('http');
const { Server } = require('socket.io');

app.use(express.json())


// Configurare CORS pentru Express
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Origini permise
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Metode permise
}));

const db = require("./models")

// Routers
const traseeRouter = require('./routes/Trasee')
const autocareRouter = require('./routes/Autocare')
const curseRouter = require('./routes/Curse')
const rezervariRouter = require('./routes/Rezervari')
const pasageriRouter = require('./routes/Pasageri')
const soferiRouter = require('./routes/Soferi')

app.use("/trasee", traseeRouter)
app.use("/autocare", autocareRouter)
app.use("/curse", curseRouter)
app.use("/rezervari", rezervariRouter)
app.use("/pasageri", pasageriRouter)
app.use("/soferi", soferiRouter)

// Creare server HTTP
const server = http.createServer(app);

// Initializare Socket.io
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], 
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    }
});

// Configurare Socket.io
io.on('connection', (socket) => {

    console.log('Un client s-a conectat:', socket.id);

    socket.on('join-cursa', (data) => {
        const { id } = data;
        socket.join(`cursa-${id}`);
        console.log(`Clientul ${socket.id} s-a alăturat cursei ${id}`);
    });

    socket.on('start-cursa', (data) => {
        const { id } = data;
        socket.join(`cursa-${id}`);
        io.to(`cursa-${id}`).emit('cursa-started', { id });
    });

    socket.on('update-coordonate', async (data) => {
        const { id, latitudine, longitudine, timp } = data;
        io.to(`cursa-${id}`).emit('new-coordonate', { latitudine, longitudine, timp });
    });

    socket.on('stop-cursa', (data) => {
        const { id } = data;
        io.to(`cursa-${id}`).emit('cursa-stopped', { id });
        socket.leave(`cursa-${id}`);
    });

    socket.on('disconnect', () => {
        console.log('Un client s-a deconectat:', socket.id);
    });
    
});

db.sequelize.sync().then(()=>{
    server.listen(3002, () => {
        console.log("Server running on port 3002")
    })
})
