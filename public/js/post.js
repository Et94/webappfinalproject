/**
 * Toggle displays all replies related to the original post
 * and hides all other posts.
 */
var toggleReplies = (postId) => {
    let repliesContainer = document.getElementById(`reply-container-${postId}`);
    let repliesElement = document.getElementById(`numReplies-${postId}`);
    let dateElement = document.getElementById(`date-${postId}`);

    if (repliesContainer.style.display = "none") {
        repliesContainer.style.display = "block";
        repliesElement.style.display = "none";
        dateElement.style.display = "none";
    } else {
        repliesContainer.style.display = "none";
        repliesElement.style.display = "block";
        dateElement.style.display = "block";
    }
};