let usermod = require("../models/users");
let postmod = require("../models/postModel")

exports.editView = (req, res, next) => {
    let id = req.session.userid;
    let User = usermod.getUserInfo(id);
    User.then( (data) => {
        res.render('editProfileView', {user: data.rows[0], editCSS: true});
    })
    .catch(error => {
        console.log(error);
    });
}

exports.editProfile = (req, res, next) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let image_url = req.body.image_url;
    let about = req.body.about;
    let country = req.body.country;
    let dob = req.body.dob;
    let id = req.session.userid;

    let p0ject = {
        firstname: first_name,
        lastname: last_name,
        imageurl: image_url,
        about: about,
        country: country,
        dob: dob
    }

    usermod.updateUser(id, p0ject);
    res.redirect(301, '/profile');
}

exports.renderHome = (req, res, next) => {
    let id = req.session.userid;
    let User = usermod.getHome(id);
    let user_data;
    let topics;
    User.then((data) => {
        // res.render('homeView', {user: data.rows[0], homeCSS: true});
        user_data = data.rows[0];
    })
    .catch(error => {
        console.log(error);
    });
    let Topics = postmod.getPostTopics();
    Topics.then((data) => {
        topics = data.rows;
        console.log(topics);
    });
    let Posts = postmod.selectAllPostsInit();
    Posts.then((data) => {
        let {posts, numposts: numPosts} = data.rows[0];
        res.render('homeView', {
            user: user_data,
            topics: topics, 
            homeCSS: true,
            post: posts,
            page: 0,
            string: id.toString(),
            route: '/posts/home',
            isFirstPage: true,
            isLastPage: 5 > numPosts});   
    })
    .catch(error => {
        console.log(error);
    });
}

