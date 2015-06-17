var runReportAndSave = function() {
	var result = exportToCsv(false);
	localStorage.setItem(result.title, result.body);
	chrome.runtime.sendMessage(
		'jbjaclcdmdkgngnebemkianabfmhhgdm',
		'Test',
		{eventType: 'DoneExporting'}
	);
};

var getReports = function() {
	var reportList = new Array();
	for (var i = 0; i < localStorage.length; i++) {
		var name = localStorage.key(i);
		var reportBody = localStorage.getItem(name);
		var newItem = {
			title: name,
			body: reportBody
		};
		reportList.push(newItem);
	}
	return reportList;
};

var deleteReport = function(itemToDelete) {
	if(typeof(itemToDelete) == 'string') {
		localStorage.removeItem(itemToDelete);
	}
};

var init = function() {
	//Load in reports and do other necessary ui tasks here.
	var list = getReports();
	var reportList = document.getElementById('reportList');
	list.forEach(function() {
		var newNode = document.createElement('li');
		newNode.innerText = this.title;
		reportList.appendChild(newNode);
	});
	document.getElementById('btnSave').addEventListener('click', function(e) {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {eventType: "button"}, function(response) {
			console.log(response.recieved);
			});
		});
	});
};

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    console.log('Message Recieved');
    sendResponse();
});

(function() {
	var list = document.getElementById('reportList');
	var newlistItem = document.createElement('li');
	newlistItem.innerText = "Freakin test!";
	list.appendChild(newlistItem);
	//Add a reference to the export-storage.js file
//	var newNode = document.createElement('script');
//	newNode.setAttribute('src', chrome.extension.getURL('/src/page_action/exporter-ui.js'));
//	document.body.appendChild(newNode);
//	setTimeout(function(){
//		init();
//	}, 100);
	init();
})();




