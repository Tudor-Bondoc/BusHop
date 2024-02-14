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

// Sterge un traseu după ID
router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    try {
        
        const traseu = await Trasee.findByPk(id);

        if (!traseu) {
            return res.status(404).json({ message: "Traseul nu a fost găsit" });
        }

        await traseu.destroy();

        res.status(204).end(); // Returnează un răspuns de succes cu codul 204 (No Content)
        
    } catch (error) {
        console.error("Eroare la ștergerea traseului:", error);
        res.status(500).json({ message: "A apărut o eroare la ștergerea traseului" });
    }
});


module.exports = router