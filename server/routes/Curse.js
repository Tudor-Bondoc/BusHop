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

//Sterge o cursa
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const cursa = await Curse.findByPk(id)
        await cursa.destroy()
        res.status(204).end()
    } catch(error) {
        console.error("Eroare la ștergerea cursei:", error)
        res.status(500).json({ message: "A apărut o eroare la ștergerea cursei" })
    }
})

module.exports = router