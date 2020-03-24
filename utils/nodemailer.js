let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
	    user: "knowledgebase4ta@gmail.com",
	    pass: "P@SSword123!"
    }
});

module.exports = {
	transporter
}