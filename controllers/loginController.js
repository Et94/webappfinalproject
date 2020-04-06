const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.login = (req, res, next) => {
	let loginData = {"email": req.body.email, "password": req.body.password};
	let userData = {};

	userModel.getUser(loginData)
	.then((data) => {
		if (data.rows.length == 0) {
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
				req.session.cookie.maxAge = 60*60*1000; //1 hour
				res.redirect(301, "/profile");
			} else {
				res.render('loginView', {loginError: true, loginCSS: true});
			}
		})
		.catch((err) => {
			console.log(err)
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
	.then(() => {
		let isUser = false;
		userModel.getUser(regData)
		.then((data) => { 
			if (data.rows.length != 0)
				isUser = true;
		})
		.then(() => {
			if (!isUser && regData.firstname != undefined && regData.lastname != undefined && regData.email != undefined 
				&& regData.password != undefined) {
				if (req.body.password != req.body.confirm_password) {
					res.render("loginView", {loginCSS: true, matchPass: true})
				} else {
					req.session.regData = regData;
					res.render("registerView", {registerCSS: true});
				}
			} else {
				res.render("loginView", {loginCSS: true, userExists: true});
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Error.');
		});
	})
	.catch((err) => {
		console.log(err);
		res.status(500).send('Error.');
	});
	
}

exports.register = (req, res, next) => {
	let regData = req.session.regData;
	if (req.body.imageurl != "")
		regData.imageurl = req.body.imageurl;
	if (req.body.about != "") {
		regData.about = req.body.about;
	} else {
		regData.about = "None Given"
	}
	
	regData.country = req.body.country;
	regData.dob = req.body.dob;

	userModel.registerUser(regData)
	.then((err) => console.log(err));
	res.render("loginView", {userCreated: true, loginCSS: true});
}

exports.logout = (req, res, next) => {
	req.session.destroy((err) => res.redirect('/'));
}