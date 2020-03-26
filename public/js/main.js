window.onload=function () {
     var objDiv = document.getElementById("msgs_list");
     objDiv.scrollTop = objDiv.scrollHeight;
}

function highlight(node) {

  	var convos = document.getElementsByClassName("selectedconvo_btn");

  	for (var i = 0; i < convos.length; i++) {
	    convos[i].style.background = "#ffffff";
	}

	node.style.background = "#f2f6fc";
}