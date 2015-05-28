//Attach startup event
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
	console.log('Message Recieved');
    sendResponse();
  });
  
//Listen for button clicked event
//chrome.pageAction.onClicked.addListener(function (tab) {
//  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//    chrome.tabs.sendMessage(tabs[0].id, {eventType: "button"}, function(response) {
//      console.log(response.recieved);
//    });
//  });
//});