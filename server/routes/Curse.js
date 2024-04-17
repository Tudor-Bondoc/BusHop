const express = require('express')
const router = express.Router()
const { Curse } = require("../models")

//Afiseaza toate cursele
router.get("/", async (req, res) => {
    const toateCursele = await Curse.findAll()
    res.json(toateCursele)
})

//Afiseaza o cursa dupa id
router.get("/:id", async (req, res) => {
    const { id } = req.params
    const cursa = await Curse.findByPk(id)
    res.json(cursa)
})

//Adauga o cursa
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
        // Caută cursa după id
        const cursa = await Curse.findByPk(id);

        // Verifică dacă cursa există
        if (!cursa) {
            return res.status(404).json({ message: "Cursa nu a fost găsită." });
        }

        // Actualizează datele cursei
        await cursa.update(updatedData);

        // Răspunde cu datele actualizate ale cursei
        res.json(cursa);
    } catch (error) {
        console.error("Eroare la actualizarea cursei:", error);
        res.status(500).json({ message: "A apărut o eroare la actualizarea cursei." });
    }
});


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