function test(name) {
	this.name = name;
	var updateName = function(name) {
		this.name = name;
	};
	var getName = function () {
		return this.name;	
	};
	return {updateName: updateName, getName: getName};
};

var extendedTest = function() {
	lastName: '';
	updateLastName= function(lastName) {
		this.lastName = lastName;
	};
	getLastName = function () {
		return this.lastName;
	};
	return {updateLastName: updateLastName, getLastName: getLastName};
}