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
    /*allowedHeaders: ["Content-Type", "Authorization"], // Header-e permise
    credentials: true // Permite trimiterea cookie-urilor și a altor informații de autentificare*/
}));

const db = require("./models")

// Routers
const traseeRouter = require('./routes/Trasee')
const autocareRouter = require('./routes/Autocare')
const curseRouter = require('./routes/Curse')
const rezervariRouter = require('./routes/Rezervari')
const pasageriRouter = require('./routes/Pasageri')

app.use("/trasee", traseeRouter)
app.use("/autocare", autocareRouter)
app.use("/curse", curseRouter)
app.use("/rezervari", rezervariRouter)
app.use("/pasageri", pasageriRouter)

// Creare server HTTP
const server = http.createServer(app);

// Inițializare Socket.io
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'], // Origini permise
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Metode permise
        /*allowedHeaders: ["Content-Type", "Authorization"], // Header-e permise
        credentials: true // Permite trimiterea cookie-urilor și a altor informații de autentificare*/
    }
});

// Configurare Socket.io
io.on('connection', (socket) => {
    console.log('Un client s-a conectat:', socket.id);

    socket.on('start-cursa', (data) => {
        const { id } = data;
        socket.join(`cursa-${id}`);
    });

    socket.on('update-coordonate', async (data) => {
        const { id, latitudine, longitudine, timp } = data;

        // Salvăm coordonatele în baza de date
        await db.Coordonate.create({ CursaID: id, latitudine, longitudine, timp });

        // Trimitem coordonatele către toți clienții conectați la această cursă
        io.to(`cursa-${id}`).emit('new-coordonate', { latitudine, longitudine, timp });
    });

    socket.on('stop-cursa', (data) => {
        const { id } = data;
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
