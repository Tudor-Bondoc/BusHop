const express = require('express')
const app = express()
app.use(express.json())

const db = require("./models")

// Routers
const traseeRouter = require('./routes/Trasee')
app.use("/trasee", traseeRouter)

db.sequelize.sync().then(()=>{
    app.listen(3002, () => {
        console.log("Server running on port 3002")
    })
})
