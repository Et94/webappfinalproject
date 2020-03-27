let userModel = require('../models/users');

exports.login = (req, res, next) => {
	let loginData = {"email": req.body.email, "password": req.body.password};
	let userData = {};

	userModel.getUser(loginData)
	.then((res) => {
		userData.password = res.rows[0].password;
		userData.email = res.rows[0].email;
		userData.userid = res.rows[0].userid;
	})
	.then(() => {
		if (userData.password == loginData.password && userData.email == loginData.email) {
			req.session.userid = userData.userid;
			req.session.cookie.maxAge = 1800000; //30 minutes
			// Will need to add variables when combining
			res.render("homeView", {homeCSS: true});
		} else {
			// add feedback to user
			res.redirect(301, '/');
		}
	})
	.catch((err) => {
		console.log(err);
	});
}

exports.signup = (req, res, next) => {
	let regData = {
		"firstname": req.body.firstname,
		"lastname": req.body.lastname,
		"email": req.body.email,
		"password": req.body.password
	}
	let isUser = false;

	let verifyNoUser = userModel.getUser(regData);

	// add user prompts for failures at the end
	verifyNoUser.then((res) => { 
		if (res != undefined)
			isUser = true;
	})
	.then(() => {
		console.log(regData);
		if (!isUser && regData.firstname && regData.lastname && regData.email && regData.password && regData.confirm_password && regData.password == req.body.confirm_password) {
			req.session.regData = regData;
			res.render("registerView", {registerCSS: true});
		} else {
			res.redirect(301, '/');
		}
	})
	.catch((err) => {
		console.log(err);
	});
}

exports.register = (req, res, next) => {
	let regData = req.session.regData;
	regData.image_url = req.body.image_url;
	regData.about = req.body.about;
	regData.country = req.body.country;
	regData.dob = req.body.dob;

	if (regData.image_url && regData.about && regData.country && regData.dob) {
		let register = userModel.registerUser(regData);
		register.then(console.log(register));
	} else {
		res.redirect(301, '/register');
	}
	
	
}

exports.logout = (req, res, next) => {
	req.session.destroy((err) => res.redirect('/'));
}