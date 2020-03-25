let db = require('../utils/db');

const insertReply = (reply) => {
    let {postId, userId, body} = reply;
    return db.query(
        `INSERT INTO Replies
        (postId, userId, body)
        VALUES ($1, $2, $3)`,
        [postId, userId, body]
    );
};

const searchPosts = (string) => {
    return db.query(
        `SELECT
            p.postId,
            up.userId as postUserId,
            up.imageURL AS postImage,
            p.body AS postBody,
            to_char(p.date, 'Mon-DD-YYYY') AS date,
            p.numReplies,
            r.replyId,
            ur.userId AS replyUserId,
            ur.imageURL AS replyImage,
            r.body AS replyBody
        FROM Posts p
            LEFT JOIN Replies r on r.postId = p.postId
            LEFT JOIN Users up on up.userId = p.userId
            LEFT JOIN Users ur on ur.userId = r.userId
        WHERE
            p.subject LIKE $1
        ORDER BY
            p.postId
        LIMIT 5`,
            [`%${string}%`]
    );
};

module.exports = {
    insertReply: insertReply,
    searchPosts: searchPosts
};
