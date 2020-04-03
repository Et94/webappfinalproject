let userModel = require('../models/users');
let likeModel = require('../models/likes');
let postModel = require('../models/posts');

const POSTS_PER_PAGE = 5

const searchOptions = (query) => {
    let {string, page, paginate} = query;
    string = string == undefined ? '' : string;
    page = page == undefined ? 0 : page;
    if(paginate) {
        page = (paginate == "next") ? ++page : --page;
    }
    let offset = page * POSTS_PER_PAGE;
    return {string, page, offset}
}

exports.getProfile = (req, res, next) => {
	let u_id = req.params.id;
	let User = userModel.getUserInfo(u_id);
	let {page, offset} = searchOptions(req.query);
	let posts;
	let numPosts;
	let profile_user;
	let ownProfile;

	if (req.session.userid == u_id) {
		ownProfile = true;
	} else {
		ownProfile = false;
	}

	User.then( (user) => {
		profile_user = user.rows[0];
		return postModel.selectPostsById(u_id, offset);
	}).then ( (data) => {
		numPosts = data.rows[0].numposts;
		posts = data.rows[0].posts;
		return likeModel.getRL(u_id);			
	}).then ( (like) => {
		let p = req.session.userid;
		let l = p == u_id? false:true;
		for (i=0; like.rows.length > i; i++) {
			if (like.rows[i].senderid == p)
				l = false;
		}
		res.render('profileView', {
			user: profile_user,
			userId: u_id,
			ProfileCSS: true, 
			likes: like.rows.length,
			ProfileView: true,
			likeBtn: l, 
			ownProfile: ownProfile,
			page: page,
			post: posts,
            route: `/profile/${u_id}`,
            isFirstPage: page == 0,
            isLastPage: offset + POSTS_PER_PAGE >= numPosts
		});
	}).catch((err) => {
		console.log(err);
	});
}

exports.like = (req, res, next) => {
	let p_id = req.body.p_id;
	let sid = req.session.userid;
	let data = {
		"rid": p_id,
		"sid": sid
	};
	
	let Like = likeModel.addL(data);
	Like.then( (data) => {
		res.redirect(301, "/profile/" + p_id);
	}).catch((err) => {
		console.log(err);
	});
}