let postModel = require('../models/posts');

exports.getAllPosts = (req, res, next) => {
	let page = req.params.page;
	let u_id = req.params.id;
	let Post = postModel.getallP();
	let profile_user;
	Post.then( (post) => {
		posts = post.rows.slice((page-1)*5, page*5);
		res.render('allPostsView', {post: posts, ProfileCSS: true});
	}).catch((err) => {
		console.log(err);
	});
}