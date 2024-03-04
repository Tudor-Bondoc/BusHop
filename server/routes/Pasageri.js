const express = require('express')
const router = express.Router()
const { Pasageri } = require("../models")
const bcrypt = require("bcrypt")

//Adauga un user
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

router.post("/login", async(req, res) => {
    
    const { email, parola } = req.body
    const pasager = await Pasageri.findOne({
        where: {
            email: email
        }
    })

    if (!pasager) res.json({error: "User does not exist"})

    bcrypt.compare(parola, pasager.parola).then((match)=>{
        if (!match) {
            res.json({error: "Wrong username - password combination"})
        }
        res.json("You logged in")
    })

})



module.exports = router