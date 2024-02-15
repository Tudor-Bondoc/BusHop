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

// Sterge un autocar după ID
router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    try {
        
        const autocar = await Autocare.findByPk(id);

        if (!autocar) {
            return res.status(404).json({ message: "Autocarul nu a fost găsit" });
        }

        await autocar.destroy();

        res.status(204).end(); // Returnează un răspuns de succes cu codul 204 (No Content)
        
    } catch (error) {
        console.error("Eroare la ștergerea autocarului:", error);
        res.status(500).json({ message: "A apărut o eroare la ștergerea autocarului" });
    }
});

module.exports = router