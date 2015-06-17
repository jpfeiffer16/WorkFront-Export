var runReportAndSave = function() {
	var result = exportToCsv(false);
	//localStorage.setItem(result.title, result.body);
//	chrome.runtime.sendMessage('jbjaclcdmdkgngnebemkianabfmhhgdm', 'Test', {}, function() {
//		console.log('Respose recieved to message send');
//	});
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {eventType: "done"}, function(response) {
		console.log(response.recieved);
		});
	});
};

var runReport = function() {
	return exportToCsv(false);
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
	return reportList();
};

var deleteReport = function(itemToDelete) {
	if(typeof(itemToDelete) == 'string') {
		localStorage.removeItem(itemToDelete);
	}
};