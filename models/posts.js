let db = require('../utils/db');

function addPost(data) {
	let query = "INSERT INTO posts (userid, topicname, subject, body, date, numreplies) VALUES ('" + data.userid + "','" + data.topicname + "','" + data.subject + "','" + data.body + "','" + data.date + "','" + data.numreplies + "')";
	return db.query(query);
}

function getAllPosts() {
	return db.query('SELECT * from posts inner join users ON posts.userid = users.userid ORDER BY posts.date DESC');
}

function getPostsByUserId(id) {
	return db.query("SELECT * from posts inner join users ON posts.userid = users.userid where posts.userid = " + id + " ORDER BY posts.date DESC");
}

function delPost(id) {
	return db.query("DELETE FROM posts WHERE postid = " + id);
}

module.exports = {
	addP: addPost,
	getallP: getAllPosts,
	getPU: getPostsByUserId,
	delP: delPost
}