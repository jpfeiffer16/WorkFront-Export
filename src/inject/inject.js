/* global chrome */
//Send startup event
chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
	}
	}, 10);
});

//Listen for buton click
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log('message recieved inject.js');
		if (request.eventType == "Button")
	  		sendResponse({response: "Recieved"});
	  //Inject the JS that exports the timesheet
	if(document.getElementById('export-script') == null) {
		var newNode = document.createElement('script');
		newNode.setAttribute('src', chrome.extension.getURL('/js/attask-export.js'));
		newNode.setAttribute('id', 'export-script');
		document.body.appendChild(newNode);
	}
	// if(document.getElementById('store-script') == null) {
	// 	var newNode = document.createElement('script');
	// 	newNode.setAttribute('src', chrome.extension.getURL('/js/export-storage.js'));
	// 	newNode.setAttribute('id', 'store-script');
	// 	document.body.appendChild(newNode);
	// }
	var newNode = document.createElement('script');
	newNode.setAttribute('src', chrome.extension.getURL('/js/catalysts/export-and-save.js'));
	document.body.appendChild(newNode);
});