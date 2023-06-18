const nodemailer = require('nodemailer')

const mailSender = (email, username, url) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_SENDER_EMAIL, // TODO: your gmail account
            pass: process.env.MAIL_SENDER_PASSWORD // TODO: your gmail password
        }
    });

    const mailOptions = {
        from: process.env.MAIL_SENDER_EMAIL,
        to: email,
        subject: "[ANIMACE] Password Reset",
        html: `
        <div style="width: 100%; background-color: #F2F4F6; text-align: center">
            <br>
            <a href="http://localhost:3000" style="text-align: center; font-size: 26px; color: #A8AAAF; text-decoration: none;font-weight: bold">ANIMACE</a>
            <br>
            <br>
            <div style="font-size: 16px; margin: 0 auto; width: 50%; color: #51545e; background-color: white; padding: 40px; ">
                <div style="text-align: left; margin-bottom: 20px;">Someone requested to reset the password for the following account:</div>
                <div style="text-align: left; margin-bottom: 20px;">Username: ${username}</div>
                <div style="text-align: left; margin-bottom: 20px;">If this was a mistake, just ignore this email and nothing will happen.</div>
                <div style="text-align: left; margin-bottom: 30px;">To reset your password, click the button below.</div>
        
                <a href=${url} style="text-align: center; font-size: 15px; text-align: center; width: 180px; background-color: #555555; padding: 12px; text-decoration: none; border-radius: 3px; letter-spacing: 2px; color:white">Reset Password</a>
            </div>
            <br>
            <br>
            <div style="font-size: 13px; color: #a8aaaf; text-align: center;">© 2022 ANIMACE. All rights reserved.</div>
            <br>
            <br>
        </div>
        `
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
        }
    });
}

module.exports = mailSender