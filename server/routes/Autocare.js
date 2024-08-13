const express = require('express')
const router = express.Router()
const { Autocare } = require("../models")

// Afiseaza toate autocarele
router.get("/", async (req, res) => {
    const toateAutocarele = await Autocare.findAll()
    res.json(toateAutocarele)
})

// Adauga un autocar
router.post("/", async (req, res) => {

    const autocar = req.body
    await Autocare.create(autocar)
    res.json(autocar)

})

// Sterge un autocar dupa ID
router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    try {
        
        const autocar = await Autocare.findByPk(id);

        if (!autocar) {
            return res.status(404).json({ message: "Autocarul nu a fost gasit" });
        }

        await autocar.destroy();

        res.status(204).end(); // Succes (no content)
        
    } catch (error) {
        console.error("Eroare la stergerea autocarului:", error);
        res.status(500).json({ message: "A aparut o eroare la stergerea autocarului" });
    }
});

module.exports = router