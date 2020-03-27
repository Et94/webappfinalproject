let usermod = require("../models/users");

exports.editView = (req, res, next) => {
    let User = usermod.getuser(1);
    User.then( (data) => {
        res.render('editProfileView', {user: data.rows[0], editCSS: true});
    });
}

exports.editProfile = (req, res, next) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let image_url = req.body.image_url;
    let about = req.body.about;
    let country = req.body.country;
    let dob = req.body.dob;

    let p0ject = {
        firstname: first_name,
        lastname: last_name,
        imageurl: image_url,
        about: about,
        country: country,
        dob: dob
    }

    usermod.update(1, p0ject);
    res.render('homeView', { pageTitle: 'People App', heading: 'Welcome to People App', searchBarText: 'Search', homeCSS: true});
}