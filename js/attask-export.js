/* global jQuery */
var download = function(filename, text) {
	var tempElement = document.createElement('a');
	tempElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	tempElement.setAttribute('download', filename);
	
	tempElement.style.display = 'none';
	document.body.appendChild(tempElement);
	
	tempElement.click();
	
	document.body.removeChild(tempElement);
};

var addScriptTagWithSrc = function(sourceAttribute) {
	var jQuerScriptTag = document.createElement('script');
	jQuerScriptTag.setAttribute('src', sourceAttribute);
	document.getElementsByTagName('body')[0].appendChild(jQuerScriptTag);
};

var exportWithJquery = function(shouldDownload) {
	var exportTitle = jQuery('#timesheet-info h2').text();
	console.log(exportTitle);
	
	var projectList = jQuery('.thead.project-hours');
	if (projectList.length < 1) {
		alert('This page does not appear to be a value Attask Timesheet. Please browse to a valid timesheet page.');
		return;
	}
	console.log(projectList);
	
	var csvFileText = [];
	csvFileText.push('"Name","Value"\n');
	console.log('Generating CSV file with gathered data...');
	projectList.each(function() {
		var tbody = jQuery(this);
		var title = tbody.find('.header').text();
		var value = tbody.find('.project-total').text();
		csvFileText.push('"' + title + '",' + value + '\n');
	});
	//Add in overhead hours if there are any
	var oHours =  jQuery('.thead.general-hours .project-total').text();
	if(oHours != '0') {
		csvFileText.push('"Overhead Hours",' + oHours);
	}
	var finalFile = csvFileText.join('');
	if(shouldDownload) {
		download(exportTitle + '.csv', finalFile);
	}
	
	return {
		title: exportTitle,
		body: finalFile
	};
};

var exportToCsv = function(shouldDownload) {
	//Add jquery if it is needed
	if(jQuery == undefined) {
		addScriptTagWithSrc('http://code.jquery.com/jquery-1.11.3.min.js');
	}
	//Now we can do some work!
//	addScriptTagWithSrc(chrome.extension.getURL('/js/export-storage.js'));
	return exportWithJquery(shouldDownload);
};

//(function() {
//	exportToCsv(true);
//})();