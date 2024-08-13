
const nodemailer = require('nodemailer');
require("dotenv").config()

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.NODEMAILER_EMAIL_ADRESS,
        pass: process.env.NODEMAILER_EMAIL_PASS
    }
});

const sendConfirmationEmail = (to, rezervareDetails) => {
    const mailOptions = {
        from: 'bushopservice@gmail.com',
        to: to,
        subject: 'Confirmare Rezervare',
        text: `Salut, Rezervarea ta a fost confirmată. Detalii: ${JSON.stringify(rezervareDetails)}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email trimis: ' + info.response);
    });
};

const sendContactEmail = (username, email, text) => {
    const mailOptions = {
        from: 'bushopservice@gmail.com',
        to: 'bushopservice@gmail.com',
        subject: `New request from ${username}`,
        text: `${email} wrote: ${text}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email trimis: ' + info.response);
    });
}

module.exports = {
    sendConfirmationEmail,
    sendContactEmail
};
