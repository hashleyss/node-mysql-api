import nodemailer from 'nodemailer';

export default sendEmail;

async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const info = await transporter.sendMail({ from, to, subject, html });

    console.log("-------------------------------------------------------");
    console.log(`Email sent to: ${to}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    console.log("-------------------------------------------------------");
}