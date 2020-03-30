window.onload=function () {
     var msgsList = document.getElementById("msgs_list");
     msgsList.scrollTop = msgsList.scrollHeight;

     var convos = document.getElementsByClassName("selectedconvo_btn");
     convos[0].style.background = "#f2f6fc";

}

function highlight(node) {

  	let convos = document.getElementsByClassName("selectedconvo_btn");

  	for (var i = 0; i < convos.length; i++) {
	    convos[i].style.background = "#ffffff";
	}

	node.style.background = "#f2f6fc";

	let conversationid = node.childNodes[1].value;

	console.log("conversationid:");
	console.log(conversationid);

	var msgs = document.getElementsByClassName("msg_description");

	for (let i = 0; i < msgs.length; i++) {
	    if (msgs[i].id != conversationid) {
	    	msgs[i].style.display = "none";
	    } else {
	    	msgs[i].style.display = "block";
	    }
	}
}