let userModel = require('../models/users');

exports.getProfile = (req, res, next) => {
	let u_id = 1; //currently hard-coded, need to modify later to work with authentacation
	let User = userModel.getU(u_id);
	User.then( (data) => {
		console.log(data);
		res.render('profileView', {user: data.rows[0], ProfileCSS: true});
	}).catch(() => {
		console.log("Error on Getting Profile Page");
	});
}