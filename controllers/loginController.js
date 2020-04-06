const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = (req, res, next) => {
	let loginData = {"email": req.body.email, "password": req.body.password};
	let userData = {};

	userModel.getUser(loginData)
	.then((data) => {
		if (data.rows.length == 0) {
			console.log("No user");
			res.render('loginView', {loginError: true, loginCSS: true});			
		} else {
			userData.password = data.rows[0].password;
			userData.email = data.rows[0].email;
			userData.userid = data.rows[0].userid;
		}
	})
	.then(() => {
		bcrypt.compare(loginData.password, userData.password)
		.then((result) => {
			if (result && userData.email == loginData.email) {
				req.session.userid = userData.userid;
				req.session.cookie.maxAge = 1800000; //30 minutes
				res.redirect(301, "/profile");
			} else {
				console.log("Wrong password")
				res.render('loginView', {loginError: true, loginCSS: true});
			}
		})
		.catch((err) => {
			console.log(err)
			res.status(500).send('Error');
		});
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send('Error');
	});
}

exports.signup = (req, res, next) => {
	let regData = {}
	bcrypt.hash(req.body.password, saltRounds)
	.then((hash) => {
		regData = {
			"firstname": req.body.firstname,
			"lastname": req.body.lastname,
			"email": req.body.email,
			"password": hash
		}
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send('Error.');
	});

	let isUser = false;

	userModel.getUser(regData)

	// add user prompts for failures at the end
	.then((res) => { 
		console.log(res.row);
		if (res.row != undefined)
			isUser = true;
	})
	.then(() => {
		console.log(regData);
		if (!isUser && regData.firstname != undefined && regData.lastname != undefined && regData.email != undefined 
			&& regData.password != undefined && req.body.password == req.body.confirm_password) {
			req.session.regData = regData;
			res.render("registerView", {registerCSS: true});
		} else {
			res.render("loginView", {loginCSS: true, userExists: true});
		}
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send('Error.');
	});
}

exports.register = (req, res, next) => {
	let regData = req.session.regData;
	regData.imageurl = req.body.imageurl;
	regData.about = req.body.about;
	regData.country = req.body.country;
	regData.dob = req.body.dob;
	console.log(regData);

	if (regData.imageurl != undefined && regData.about != undefined 
		&& regData.country != undefined && regData.dob != undefined) {
		userModel.registerUser(regData)
		.then((err) => {
			console.log(err);
			res.status(500).send('Error registering user.');
		});
		res.render("loginView", {userCreated: true, loginCSS: true});
	} else {
		res.redirect('/register', {registerCSS: true});
	}
	
	
}

exports.logout = (req, res, next) => {
	req.session.destroy((err) => res.redirect('/'));
}