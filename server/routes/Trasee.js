const express = require('express')
const router = express.Router()
const { Trasee } = require("../models")

//Afiseaza toate traseele
router.get("/", async (req, res) => {
    const toateTraseele = await Trasee.findAll()
    res.json(toateTraseele)
})

//Adauga un traseu
router.post("/", async (req, res) => {

    const traseu = req.body
    await Trasee.create(traseu)
    res.json(traseu)

})

module.exports = router