import nodemailer from 'nodemailer';
import config from '../config.json';

export default sendEmail;

async function sendEmail({ to, subject, html, from = config.emailFrom }) {
    const transporter = nodemailer.createTransport(config.smtpOptions);
    const info = await transporter.sendMail({ from, to, subject, html });

    console.log("-------------------------------------------------------");
    console.log(`Email sent to: ${to}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log("-------------------------------------------------------");
}