let postmod = require("../models/posts");

exports.createPost = (req, res, next) => {
    let p_subject = req.body.subject;
    let p_question = req.body.question;
    let p_topic = req.body.topic;

    let p0ject = {
        userid: 1,
        topicname: p_topic,
        subject: p_subject,
        body: p_question
    };

    postmod.post(p0ject);
    res.render('homeView', { pageTitle: 'People App', heading: 'Welcome to People App', searchBarText: 'Search', homeCSS: true});
}