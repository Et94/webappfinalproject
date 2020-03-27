let db = require('../utils/db');

function getAllPosts() {
	return db.query("SELECT to_char(date, 'Mon DD, YYYY HH:MI PM'), * from posts inner join users ON posts.userid = users.userid ORDER BY posts.date DESC");
}

function getPostsByUserId(id) {
	return db.query("SELECT to_char(date, 'Mon DD, YYYY HH:MI PM'), * from posts inner join users ON posts.userid = users.userid where posts.userid = " + id + " ORDER BY posts.date DESC");
}

module.exports = {
	getallP: getAllPosts,
	getPU: getPostsByUserId,
}