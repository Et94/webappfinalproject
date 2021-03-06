let db = require('../utils/db');

function createConversation(input) {
	let sql = `Insert into conversations (senderid, receiverid, subject) values (${input.senderId} , ${input.receiverId}, '${input.subject}') returning conversationId`;

	return db.query(sql);
}

function sendMessage(input) {
	let sql = `Insert into messages (conversationid, body, date, senderid) values (${input.conversationId}, '${input.msg}', '${input.date}', ${input.senderId});`;

	return db.query(sql);
}

function getUserImage(receiverId) {
	let sql = `Select users.imageurl from users where userid = ${receiverId};`;
	return db.query(sql);
}

function getUserEmail(receiverId) {
	let sql = `Select users.email from users where userid = ${receiverId};`;
	return db.query(sql);
}

function getConvoList(currentUserId) {
	let sql = `Select c.conversationid, c.senderid, c.receiverid, c.subject, to_char(c.latestdate::timestamp, 'Mon DD') as latestdate, u.userid, u.firstname, u.lastname, u.imageurl
		from conversations c 
		join users u 
		on u.userid = c.senderid or u.userid = c.receiverid
		where (c.senderid = ${currentUserId} or c.receiverid = ${currentUserId}) and u.userid != ${currentUserId} order by c.latestdate desc`;

	return db.query(sql);
}

function getMsgList(currentUserId) {
	let sql = `Select c.conversationid, m.messageid, m.body, m.senderid, u.firstname, u.lastname, u.imageurl, 
		to_char(m.date::timestamp, 'Mon DD') as date, 
		to_char(m.date::timestamp, 'HH:MI PM') as time  
		from conversations c 
		join messages m 
		on (m.conversationid = c.conversationid) 
		and (c.receiverid = ${currentUserId} or c.senderid = ${currentUserId}) 
		join users u 
		on (m.senderid = u.userid) 
		order by m.date`;

	return db.query(sql);
}

module.exports = {
	createConversation : createConversation,
	sendMessage : sendMessage,
	getUserImage: getUserImage,
	getUserEmail: getUserEmail,
	getConvoList: getConvoList,
	getMsgList: getMsgList
}