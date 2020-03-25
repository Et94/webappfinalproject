var postModel = require('../models/postModel');

exports.replyToPost = (req, res, next) => {
    let reply = {postId, userId, body} = req.body;
    postModel.insertReply(reply)
    .then(data => {
        console.log("Successful insertion of reply into Replies table.");
        // redirect or render a view
    })
    .catch(error => {
        console.log(error);
        res.status(502).send("Error inserting reply into Replies table.")
    });
};

exports.searchPosts = (req, res, next) => {
    let string = req.body.searchString;
    postModel.searchPosts(string)
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
};

// exports.getReplies = (req, res, next) => {
//     let postId = req.body.postId;
//     postModel.selectReplies(postId)
//     .then(data => {
//         console.log(data.rows);
//         // potential solution is to have a separate view for a single post with all of its replies?
//         res.render('homeView', {
//             pageTitle: 'People App', 
//             homeCSS: true,
//             reply: data.rows,
//         });
//     })
//     .catch(error => {
//         console.log(error);
//         res.status(500).send("Error retrieving replies from replies table.")
//     });
// };