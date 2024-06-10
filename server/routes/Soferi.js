const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const { validateToken2 } = require("../middlewares/AuthMiddleware2")

const { Soferi } = require('../models')
const {sign} = require('jsonwebtoken')

//Afiseaza toti soferii
router.get("/", async (req, res) => {
    const totiSoferii = await Soferi.findAll()
    res.json(totiSoferii)
})

//Adauga un sofer
router.post("/", async(req, res) => {
    const { nume, email, parola } = req.body
    bcrypt.hash(parola, 10).then((hash)=>{
        Soferi.create({
            nume: nume,
            email: email,
            parola: hash,
        })
        res.json("SUCCESS")
    })
})

router.get("/auth", validateToken2, async(req, res) => {
    res.json(req.sofer)
})

//Login
router.post("/login", async(req, res) => {

    const { email, parola } = req.body
    const sofer = await Soferi.findOne({
        where: {
            email: email
        }
    })

    if (!sofer) res.json({error: "User does not exist"})

    else
    {
        bcrypt.compare(parola, sofer.parola).then((match)=>{
            if (!match) {
                res.json({error: "Wrong username - password combination"})
            }
            else 
            {
                const accessToken = sign({
                    nume: sofer.nume,
                    email: sofer.email,
                    id: sofer.id,
                }, "importantsecret")
                res.json({
                    token: accessToken,
                    nume: sofer.nume,
                    email: sofer.email,
                    id: sofer.id
                })
            }
        })
    }
})

module.exports = router