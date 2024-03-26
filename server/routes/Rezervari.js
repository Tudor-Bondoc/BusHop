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

//Afiseaza toate rezervarile unui pasager
router.get("/byuser/:name", async (req, res) => {

    const { name } = req.params

    const toateRezervarile = await Rezervari.findAll({
        where: {
            nume: name
        }
    })

    res.json(toateRezervarile)

})

//Adauga o rezervare la o cursa
router.post("/:id", validateToken, async (req, res) => {

    let rezervare = req.body

    rezervare = 
    { 
        ...rezervare,
        nume: req.pasager.nume
    }

    await Rezervari.create(rezervare)

    res.json(rezervare)

})

module.exports = router

