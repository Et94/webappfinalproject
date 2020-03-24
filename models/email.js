let nodemailer = require('../utils/nodemailer');

function sendEmail(email, subject, msg) {

	// Add firstName

	let mailOptions = {
            from: "knowledgebase4ta@gmail.com",
            to: email,
            subject: 'Knowledge Base - New Conversation',
            text: 'You have received a new conversation, ' + subject + ': ' + msg + ' - Knowledge Base Team',
            html: '<h3>You have received a new conversation</h3><p><b>' + subject + '</b></p><p>' + msg + '</p><br><p>- Knowledge Base Team</p>'
    };

    return nodemailer.transporter.sendMail(mailOptions);
}

module.exports = {
	sendEmail: sendEmail
}