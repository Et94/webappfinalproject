/**
 * Toggle displays all replies related to the original post.
 * @param {int} postId 
 */
var toggleReplies = (postId) => {
    let replyContainer = document.getElementById(`reply-container-${postId}`);
    if (replyContainer.style.display = "none") {
        replyContainer.style.display = "block";
    } else {
        replyContainer.style.display = "none";
    }
};

/**
 * Sends request to retrieve replies toggle displays all replies to the
 * related post.
 * @param {int} postId 
 */
var getReplies = (postId) => {
    document.getElementById(`post-footer-${postId}`).submit();
    toggleReplies(postId);
};