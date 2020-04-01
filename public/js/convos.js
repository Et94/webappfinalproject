window.onload = function() {
    var msgsList = document.getElementById("msgs_list");
    msgsList.scrollTop = msgsList.scrollHeight;

    var convos = document.getElementsByClassName("selectedconvo_btn");
    convos[0].style.background = "#f2f6fc";

    showMessages(convos[0]);

    // Set selected conversationid to input field for sending msg
    console.log("First conversationid:");
	console.log(convos[0].childNodes[1].value);
	document.getElementById("currentconvo_id").value = convos[0].childNodes[1].value;
}

function showButton() {
	let convos = document.getElementsByClassName("selectedconvo_btn");
	let input = document.getElementById("msg_input").value;

	if (convos.length > 0 && input.length > 0) {
		document.getElementById("send_btn").disabled = false;
	} else {
		document.getElementById("send_btn").disabled = true;
	}
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

	// Set selected conversationid to input field for sending msg
	document.getElementById("currentconvo_id").value = conversationid;

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

	var msgsList = document.getElementById("msgs_list");
    msgsList.scrollTop = msgsList.scrollHeight;
}