let db = require('../utils/db');

function createConversation(input) {

	// example
	// insert into conversations (senderid, receiverid, subject) values (1, 2, 'Second convo test');

	// input.senderId
	// input.receiverId
	// input.subject

	let sql = `Insert into conversations (senderid, receiverid, subject) values (${input.senderId} , ${input.receiverId}, '${input.subject}') returning conversationId`;

	return db.query(sql);
}

function sendMessage(input) {

	// example
	// insert into messages (conversationId, body, date, senderId) values (3, 'First test msg', now(), 1);

	// input.conversationId
	// input.msg
	// input.senderId

	let sql = `Insert into messages (conversationid, body, date, senderid) values (${input.conversationId}, '${input.msg}', now(), ${input.senderId});`;

	return db.query(sql);
}

function getUserEmail(receiverId) {
	let sql = `select users.email from users where userid = ${receiverId};`;
	return db.query(sql);
}

module.exports = {
	createConversation : createConversation,
	sendMessage : sendMessage,
	getUserEmail: getUserEmail
}