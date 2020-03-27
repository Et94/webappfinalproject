let userModel = require('../models/users');
let likeModel = require('../models/likes');

exports.getProfile = (req, res, next) => {
	let u_id = req.params.id;
	let User = userModel.getU(u_id);
	let profile_user;
	User.then( (user) => {
		profile_user = user.rows[0];
		return likeModel.getRL(u_id);
	}).then ( (like) => {
		let l = true;
		for (i=0; like.rows.length > i; i++) {
			if (like.rows[i].senderid == 2) //currently the senderid is hard-coded, need to modify later to work with authentacation
				l = false;
		}
		res.render('profileView', {user: profile_user, ProfileCSS: true, likes: like.rows.length, likeBtn: l});
	}).catch((err) => {
		console.log(err);
	});
}