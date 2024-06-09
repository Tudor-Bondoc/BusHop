const express = require('express')
const router = express.Router()
const { Rezervari, Curse } = require("../models")
const {validateToken} = require('../middlewares/AuthMiddleware')
const { sendConfirmationEmail } = require('../services/emailService')

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

//Afiseaza rezervarile active ale unui pasager
router.get("/byuser/active/:name", async (req, res) => {
    const { name } = req.params;

    try {
        // Folosește o interogare JOIN pentru a obține rezervările care au curse neînțiate
        const rezervariNeinitiate = await Rezervari.findAll({
            where: {
                nume: name
            },
            include: [{
                model: Curse,
                as: 'cursa',
                where: {
                    status: 'neinitiata'
                }
            }]
        });

        res.json(rezervariNeinitiate);
    } catch (error) {
        console.error("Eroare în obținerea rezervărilor:", error);
        res.status(500).json({ error: "Eroare în obținerea rezervărilor" });
    }
});

// Endpoint pentru a obține numărul de rezervări pentru o cursă specifică
router.get("/numar/:id", async (req, res) => {
    const cursaId = req.params.id;

    try {
        const numarRezervari = await Rezervari.count({
            where: {
                CursaID: cursaId
            }
        });

        res.json({ cursaId, numarRezervari });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

//Adauga o rezervare la o cursa
router.post("/:id", validateToken, async (req, res) => {

    let rezervare = req.body

    rezervare = 
    { 
        ...rezervare,
        nume: req.pasager.nume
    }

    await Rezervari.create(rezervare)

    // Trimitere email de confirmare
    sendConfirmationEmail(req.pasager.email, {
        loc: rezervare.loc,
        CursaID: rezervare.CursaID,
        nume: req.pasager.nume,
        email: req.pasager.email
    });

    res.json(rezervare)

})

//Adauga o rezervare la cursa pentru aplicatia client admin
router.post("/novalidate/:id", async (req, res) => {

    let rezervare = req.body

    await Rezervari.create(rezervare)

    res.json(rezervare)

})


module.exports = router

