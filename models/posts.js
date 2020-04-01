let db = require('../utils/db');

function createPost(e) {
    db.query("Insert into posts (userid, topicname, subject, body) VALUES ((SELECT userid from users where userid = " + e.userid + "), (SELECT topicname from topics where topicname = '" + e.topicname + "'), '" + e.subject + "', '" + e.body + "')");
}

module.exports = {
    post: createPost
}