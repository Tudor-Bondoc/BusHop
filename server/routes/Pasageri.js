const express = require('express')
const router = express.Router()
const { Pasageri } = require("../models")
const bcrypt = require("bcrypt")
const {validateToken} = require("../middlewares/AuthMiddleware")
const {sendContactEmail} = require("../services/emailService")
const {sign} = require('jsonwebtoken')

// Adauga un user
router.post("/", async(req, res) => {
    const { nume, email, parola, telefon } = req.body
    bcrypt.hash(parola, 10).then((hash)=>{
        Pasageri.create({
            nume: nume,
            email: email,
            parola: hash,
            telefon: telefon
        })
        res.json("SUCCESS")
    })
})

// Endpoint de verificare a autentificarii la montarea aplicatiilor React
router.get("/auth", validateToken, async(req, res) => {
    res.json(req.pasager)
})

// Date despre un pasager
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const pasagerr = await Pasageri.findByPk(id);
        if (!pasagerr) {
            return res.status(404).json({ error: "Pasagerul nu a fost gasit" });
        }
        res.json(pasagerr);
    } catch (error) {
        console.error("Error retrieving pasager:", error);
        res.status(500).json({ error: "Could not retrieve pasager" });
    }
});

// Login
router.post("/login", async(req, res) => {

    const { email, parola } = req.body
    const pasager = await Pasageri.findOne({
        where: {
            email: email
        }
    })

    if (!pasager) res.json({error: "User does not exist"})

    else
    {
        bcrypt.compare(parola, pasager.parola).then((match)=>{
            if (!match) {
                res.json({error: "Wrong username - password combination"})
            }
            else 
            {
                const accessToken = sign({
                    nume: pasager.nume,
                    email: pasager.email,
                    id: pasager.id,
                }, "importantsecret")
                res.json({
                    token: accessToken,
                    nume: pasager.nume,
                    email: pasager.email,
                    id: pasager.id
                })
            }
        })
    }
})

//Trimitere mail contact
router.post("/contact", async (req, res) => {

    const { nume, email, text } = req.body

    sendContactEmail(nume, email, text)

    res.json("Mail trimis")

})



module.exports = router