/**
 * Toggle displays all replies related to the original post.
 * @param {int} postId 
 */
var toggleReplies = (postId) => {
    let reply = document.getElementById(`reply-container-${postId}`);
    reply.style.display = reply.style.display === "block" ? "none" : "block";
};