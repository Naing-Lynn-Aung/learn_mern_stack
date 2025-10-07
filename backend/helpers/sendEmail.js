const nodemailer = require("nodemailer");
const ejs = require('ejs');

const sendEmail = async ({ view, data, from, to, subject }) => {
    try {
        const transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_AUTH_USER,
                pass: process.env.MAIL_AUTH_PASS
            }
        });
        const dataString = await ejs.renderFile('./views/' + view + '.ejs', data);
        const info = await transport.sendMail({
            from,
            to,
            subject,
            html: dataString,
        });
        console.log('message', info.messageId);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = sendEmail;