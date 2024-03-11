const express = require('express')
const router = express.Router()
const { Rezervari } = require("../models")
const {validateToken} = require('../middlewares/AuthMiddleware')

//Afiseaza toate rezervarile specifice unei curse
router.get("/:id", async (req, res) => {

    const cursaId = req.params.id

    const toateRezervarile = await Rezervari.findAll({
        where: {
            CursaID: cursaId
        }
    })

    res.json(toateRezervarile)

})

//Adauga o rezervare la o cursa
router.post("/:id", validateToken, async (req, res) => {

    let rezervare = req.body

    const cursaId = req.params.id

    rezervare = { ...rezervare, CursaID: cursaId}

    await Rezervari.create(rezervare)

    res.json(rezervare)

})

module.exports = router

