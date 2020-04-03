const db = require('../utils/db');
var selectPostsTemplate = (whereClause) => {
    return `WITH five_posts AS (
        SELECT
            p.postId,
            up.userId,
            up.imageURL,
            p.subject,
            p.topicName,
            p.body,
            TO_CHAR(p.date, 'Mon DD YYYY') AS date,
            p.numReplies,
            JSON_AGG(postReplies) AS reply
        FROM Posts p
            LEFT JOIN Users up ON up.userId = p.userId
            LEFT JOIN (
                SELECT
                    r.postId,
                    r.replyId,
                    ur.userId,
                    ur.imageURL,
                    r.body
                FROM Posts p
                    left join Replies r ON r.postId = p.postId
                    left join Users ur ON ur.userId = r.userId
                ) postReplies ON postReplies.postId = p.postId
        WHERE
            ${whereClause}
        GROUP BY 
            p.postId,
            up.userId,
            up.imageURL,
            p.subject,
            p.topicName,
            p.body,
            date,
            p.numReplies
        ORDER BY
            p.date DESC
        LIMIT 5 OFFSET $2)
        SELECT 
            (	SELECT COUNT(*)
                FROM Posts p
                WHERE ${whereClause}
            ) AS numPosts,
            ARRAY_TO_JSON(ARRAY_AGG(fp)) AS posts
        FROM five_posts fp;`;
}

function createPost(e) {
    db.query("Insert into posts (userid, topicname, subject, body) VALUES ((SELECT userid from users where userid = " + e.userid + "), (SELECT topicname from topics where topicname = '" + e.topicname + "'), '" + e.subject + "', '" + e.body + "')");
}

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
 * Returns a json object containing 5 posts and their replies filtered by subject.
 * If subject parameter is null, returns posts unfiltered.
 * @param {string} subject
 * @param {int} offset
 */
const selectPostsBySubject = (subject, offset) => {
    let whereClause = "LOWER(p.subject) LIKE LOWER($1)"
    let query = selectPostsTemplate(whereClause);
    return db.query(query, [`%${subject}%`, offset]);
};

/**
 * Returns a json object containing 5 posts and their replies filtered by topic.
 * @param {string} topic 
 * @param {int} offset 
 */
const selectPostsByTopic = (topic, offset) => {
    let whereClause = 'p.topicName = $1';
    let query = selectPostsTemplate(whereClause);
    return db.query(query, [topic, offset]);
};

const selectPostsById = (id, offset) => {
    let whereClause = 'p.userId = $1';
    let query = selectPostsTemplate(whereClause);
    return db.query(query, [id, offset]);
}

const selectAllPosts = (offset) => {
    let whereClause = '1 = $1';
    let query = selectPostsTemplate(whereClause);
    return db.query(query, [1, offset]);
}

const getPostTopics = () => {
    return db.query("Select topicname from topics");
}

module.exports = {
    insertReply: insertReply,
    createPost: createPost,
    getPostTopics: getPostTopics,
    selectPostsBySubject: selectPostsBySubject,
    selectPostsByTopic: selectPostsByTopic,
    selectPostsById: selectPostsById,
    selectAllPosts: selectAllPosts,
};
