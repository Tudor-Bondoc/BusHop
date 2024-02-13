const express = require('express')
const router = express.Router()
const { Autocare } = require("../models")

//Afiseaza toate autocarele
router.get("/", async (req, res) => {
    const toateAutocarele = await Autocare.findAll()
    res.json(toateAutocarele)
})

//Adauga un autocar
router.post("/", async (req, res) => {

    const autocar = req.body
    await Autocare.create(autocar)
    res.json(autocar)

})

module.exports = router