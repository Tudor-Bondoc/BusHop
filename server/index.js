const express = require('express')
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

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

db.sequelize.sync().then(()=>{
    app.listen(3002, () => {
        console.log("Server running on port 3002")
    })
})
