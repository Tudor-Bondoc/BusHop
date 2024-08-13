const express = require('express')
const router = express.Router()
const { Rezervari, Curse, Trasee, Autocare } = require("../models")
const {validateToken} = require('../middlewares/AuthMiddleware')
const { sendConfirmationEmail } = require('../services/emailService')
const { Op } = require("sequelize");

// Afiseaza toate rezervarile specifice unei curse
router.get("/:id", async (req, res) => {

    const cursaId = req.params.id

    const toateRezervarile = await Rezervari.findAll({
        where: {
            CursaID: cursaId
        }
    })

    res.json(toateRezervarile)

})

// Afiseaza toate rezervarile unui pasager dupa nume
router.get("/byuser/:name", async (req, res) => {

    const { name } = req.params

    const toateRezervarile = await Rezervari.findAll({
        where: {
            nume: name
        }
    })

    res.json(toateRezervarile)

})

// Afiseaza toate rezervarile unui pasager dupa id
router.get("/byuserid/:id", async (req, res) => {

    const { id } = req.params

    const toateRezervarile = await Rezervari.findAll({
        where: {
            PasagerID: id
        }
    })

    res.json(toateRezervarile)

})


// Afiseaza rezervarile active ale unui pasager
router.get("/byuserid/active/:id", async (req, res) => {

    const { id } = req.params;

    try {
        const rezervariActive = await Rezervari.findAll({
            where: {
                PasagerID: id
            },
            include: [{
                model: Curse,
                as: 'cursa',
                where: {
                    status: {
                        [Op.or]: ['neinitiata', 'in desfasurare']
                    }
                }
            }]
        });

        res.json(rezervariActive);
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

// Adauga o rezervare la o cursa
router.post("/:id", validateToken, async (req, res) => {

    let rezervare = req.body

    rezervare = 
    { 
        ...rezervare,
        nume: req.pasager.nume,
        PasagerID: req.pasager.id
    }

    await Rezervari.create(rezervare)

    const cursa = await Curse.findByPk(rezervare.CursaID)

    const traseu = await Trasee.findByPk(cursa.TraseuID)

    const autocar = await Autocare.findByPk(cursa.AutocarID)

    // Trimitere email de confirmare
    sendConfirmationEmail(req.pasager.email, {
        loc: rezervare.loc,
        nume: req.pasager.nume,
        Plecare: traseu.oras_pornire,
        Destinatie: traseu.oras_sosire,
        Zi: cursa.zi_plecare,
        Ora: cursa.ora_plecare,
        Autocar: autocar.numar_inmatriculare,
        Pret: cursa.pret
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

