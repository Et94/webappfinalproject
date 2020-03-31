let db = require('../utils/db');

exports.getUserInfo = (id) => {
    return db.query(
        'Select * from users where userid = ' + id
    );
}

exports.updateUser = (id, e) => {
    db.query(
        "Update users set firstname = '" + e.firstname + "', lastname = '" + e.lastname + "', imageurl = '" + e.imageurl + "', about = '" + e.about + "', country = '" + e.country + "', dob = '" + e.dob + "' where userid = 1"
    );
}

// sort out which methods to keep and which to combine. Also, figure out a common syntax.

// Luc's login getUser and register user for login/register
exports.getUser = (data) => {
	let sql = "Select * from users where email = '" + data.email + "' and password = '" + data.password + "'";
	return db.query(sql);
}

exports.registerUser = (data) => {
	let sql = "Insert into users(firstname, password, imageurl, about, country, dob, email, lastname) values('" 
	+ data.firstname + "', '" + data.password + "', '" + data.imageurl + "', '" + data.about + "', '"
	+ data.country + "', '" + data.dob + "', '" + data.email + "', '" + data.lastname + "');"
	return db.query(sql);
}

// Harry's user methods
exports.getallU = () => {
	return db.query('SELECT * from users');
}

exports.getU = (id) => {
	return db.query("SELECT * from users where userid = " + id);
}

exports.delU = (id) => {
	return db.query("DELETE FROM users WHERE userid = " + id);
}

exports.getHome = (id) => {
	return getUser(id);
}

function getUser(id) {
	return db.query(
        'Select * from users where userid = ' + id
    );
}