const express = require('express')
const router = express.Router()
const { Curse } = require("../models")

//Afiseaza toate cursele
router.get("/", async (req, res) => {
    const toateCursele = await Curse.findAll()
    res.json(toateCursele)
})

//Adauga o cursa
router.post("/", async (req, res) => {

    const cursa = req.body
    await Curse.create(cursa)
    res.json(cursa)

})

module.exports = router