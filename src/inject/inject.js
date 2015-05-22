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
    if (request.eventType == "Button")
      sendResponse({response: "Recieved"});
      //Inject the JS that exports the timesheet
      var newNode = document.createElement('script');
      newNode.setAttribute('src', chrome.extension.getURL('/js/attask-export.js'));
      document.body.appendChild(newNode);
  });