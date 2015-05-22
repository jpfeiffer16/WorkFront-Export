document.onload = function() {
	var list = document.getElementById('reportList');
	var newlistItem = document.createElement('li');
	newlistItem.innerText = "Freakin test!";
	list.appendChild(newlistItem);
};

