
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    service: 'yahoo',
    secure: false, 
    auth: {
        user: 'bushopservice@yahoo.com',
        pass: 'Licenta123#'
    }
});

const sendConfirmationEmail = (to, rezervareDetails) => {
    const mailOptions = {
        from: 'bushopservice@yahoo.com',
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

module.exports = {
    sendConfirmationEmail
};
