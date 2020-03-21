let db = require('../utils/db');

insertReply = (reply) => {
    let {postId, userId, body} = reply;
    return db.execute(
        `Insert into Replies
        (postId, userId, body)
        VALUES (?, ?, ?)`,
        [postId, userId, body]);
}

module.exports = {
    insertReply: insertReply
}
