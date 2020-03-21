var postModel = require('../models/postModel');

exports.postReply = (req, res, next) => {
    let reply = req.body.reply;
    postModel.insertReply(reply)
    .then(data => {
        console.log("Successful insertion of reply into Replies table.");
        res.redirect(301, '/home');
    })
    .catch(error => {
        console.log(error);
        res.status(502).send("Error inserting reply into Replies table.")
    });
};