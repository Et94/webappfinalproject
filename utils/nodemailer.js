let nodemailer = require('nodemailer');
require('dotenv').config();

function sendEmail(email, subject, msg) {
	let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
		    user: process.env.NODEMAIL_EMAIL,
		    pass: process.env.NODEMAIL_PASSWORD
	    }
	});

	let mailOptions = {
            from: process.env.NODEMAIL_EMAIL,
            to: email,
            subject: 'Knowledge Base - New Conversation',
            text: 'You have received a new conversation, ' + subject + ': ' + msg + ' - Knowledge Base Team',
            html: '<h3>You have received a new conversation</h3><p><b>' + subject + '</b></p><p>' + msg + '</p><br><p>- Knowledge Base Team</p>'
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
	sendEmail: sendEmail
}