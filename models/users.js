let db = require('../utils/db');

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

// insert into users(firstname, password, imageurl, about, country, dob, email, lastname) values('test', 'password', 'img', 'about', 'Canada', '2000/01/01', 'test@test.com', 'test');
