let db = require('../utils/db');

function addUser(data) {
	let query = "INSERT INTO users (firstname, lastname, password, imageurl) VALUES ('" + data.firstname + "','" + data.lastname + "','" + data.pass + "','" + data.url + "')";
	return db.query(query);
}

function getAllUsers() {
	return db.query('SELECT * from users');
}

function getUserById(id) {
	return db.query("SELECT * from users where userid = " + id);
}

function delUser(id) {
	return db.query("DELETE FROM users WHERE userid = " + id);
}



module.exports = {
	addU: addUser,
	getallU: getAllUsers,
	getU: getUserById,
	delU: delUser
}