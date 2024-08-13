const express = require('express')
const router = express.Router()

const { Curse, Rezervari, sequelize } = require('../models');
const { validateToken2 } = require("../middlewares/AuthMiddleware2")

// Afiseaza toate cursele
router.get("/", async (req, res) => {
    const toateCursele = await Curse.findAll()
    res.json(toateCursele)
})

// Afiseaza toate cursele care nu au inceput
router.get("/neinitiate", async (req, res) => {
    const toateCursele = await Curse.findAll({
        where: {
            status: "neinitiata"
        }
    })
    res.json(toateCursele)
})

// Afiseaza o cursa dupa id
router.get("/:id", async (req, res) => {
    const { id } = req.params
    const cursa = await Curse.findByPk(id)
    res.json(cursa)
})

// Afiseaza cursele unui sofer
router.get("/bydriver/:id", async (req, res) => {
    const { id } = req.params
    const listaCurse = await Curse.findAll({
        where: {
            SoferID: id
        }
    })
    res.json(listaCurse)
})

// Adauga o cursa
router.post("/", async (req, res) => {

    const cursa = req.body
    await Curse.create(cursa)
    res.json(cursa)

})

// Actualizare cursa
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const cursa = await Curse.findByPk(id);
        if (!cursa) {
            return res.status(404).json({ message: "Cursa nu a fost gasita." });
        }
        await cursa.update(updatedData);
        res.json(cursa);
    } catch (error) {
        console.error("Eroare la actualizarea cursei:", error);
        res.status(500).json({ message: "A aparut o eroare la actualizarea cursei." });
    }
});


// Sterge o cursa
router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const cursa = await Curse.findByPk(id)
        await cursa.destroy()
        res.status(204).end()
    } catch(error) {
        console.error("Eroare la stergerea cursei:", error)
        res.status(500).json({ message: "A aparut o eroare la stergerea cursei" })
    }
})

module.exports = router