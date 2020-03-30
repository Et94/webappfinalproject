window.onload = function() {
    var msgsList = document.getElementById("msgs_list");
    msgsList.scrollTop = msgsList.scrollHeight;

    var convos = document.getElementsByClassName("selectedconvo_btn");
    convos[0].style.background = "#f2f6fc";

    showMessages(convos[0]);
}

function showMessages(node) {

	// Make all conversations white
  	let convos = document.getElementsByClassName("selectedconvo_btn");
  	for (var i = 0; i < convos.length; i++) {
	    convos[i].style.background = "#ffffff";
	}

	// Highlight selected conversation
	node.style.background = "#f2f6fc";

	// Get selected conversationid
	let conversationid = node.childNodes[1].value;
	console.log("conversationid:");
	console.log(conversationid);

	// Hide all dates
	var dates = document.getElementsByClassName("msg_date");
	for (let i = 0; i < dates.length; i++) {
		dates[i].style.display = "none";
	}

	// Show date and messages of selected conversation id
	var msgs = document.getElementsByClassName("msg_description");
	for (let i = 0; i < msgs.length; i++) {

	    if (msgs[i].id != conversationid) {
	    	msgs[i].style.display = "none";
	    } else {
	    	msgs[i].parentNode.style.display = "block";
	    	msgs[i].style.display = "flex";
	    }
	}
}