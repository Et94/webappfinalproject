let db = require('../utils/db');

/**
 * Inserts a reply into the Replies table.
 * @param {object} reply 
 */
const insertReply = (reply) => {
    let {postId, userId, body} = reply;
    return db.query(
        `INSERT INTO Replies
        (postId, userId, body)
        VALUES ($1, $2, $3)`,
        [postId, userId, body]
    );
};

/**
 * Returns a json object containing 5 posts and their replies.
 * @param {string} string
 */
const searchPosts = (string) => {
    return db.query(
        `WITH five_posts AS (
            SELECT 
                p.postId,
                up.userId,
                up.imageURL,
                p.subject,
                p.topicName,
                p.body,
                to_char(p.date, 'Mon DD YYYY') as date,
                p.numReplies,
                json_agg(postReplies) as reply
            FROM Posts p
                LEFT JOIN Users up on up.userId = p.userId
                LEFT JOIN (
                    SELECT
                        r.postId,
                        r.replyId,
                        ur.userId,
                        ur.imageURL,
                        r.body
                    FROM Posts p2
                        left join Replies r on r.postId = p2.postId
                        left join Users ur on ur.userId = r.userId
                    ) postReplies on postReplies.postId = p.postId
            WHERE
                p.subject LIKE $1
            group by 
                p.postId,
                up.userId,
                up.imageURL,
                p.subject,
                p.topicName,
                p.body,
                date,
                p.numReplies
            ORDER BY
                p.postId
            LIMIT 5)
            SELECT 
                array_to_json(array_agg(fp)) as posts
            from five_posts fp`,
                [`%${string}%`]
    );
};

module.exports = {
    insertReply: insertReply,
    searchPosts: searchPosts
};
