window.onload=function () {
     var msgsList = document.getElementById("msgs_list");
     msgsList.scrollTop = msgsList.scrollHeight;

     var convos = document.getElementsByClassName("selectedconvo_btn");
     convos[0].style.background = "#f2f6fc";

}

function highlight(node) {

  	var convos = document.getElementsByClassName("selectedconvo_btn");

  	for (var i = 0; i < convos.length; i++) {
	    convos[i].style.background = "#ffffff";
	}

	node.style.background = "#f2f6fc";
}