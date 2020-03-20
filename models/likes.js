let db = require('../utils/db');

function addLike(data) {
	let query = "INSERT INTO likes (recipientid, senderid) VALUES ('" + data.rid + "','" + data.sid + "')";
	return db.query(query);
}

function getLikesBySenderId(id) {
	return db.query("SELECT * from likes where senderid = " + id);
}

function getLikesByRecipientId(id) {
	return db.query("SELECT * from likes where recipientid = " + id);
}

function getLike(rid, sid) {
	return db.query("SELECT * from likes where recipientid = " + rid + " AND senderid = " + sid);
}

module.exports = {
	addL: addLike,
	getSL: getLikesBySenderId,
	getRL: getLikesByRecipientId,
	getRSL: getLike
}