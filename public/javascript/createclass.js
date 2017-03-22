//TODO: event-based field validation for user's benefit

function submitCreateClass() {

	var classCode = $('#classcode').val().toUpperCase();
	var className = $('#classname').val();
	var hours = $('#hours').val();
	var location = $('#location').val();
	var TAs = $('#TAs').val();

	var validInput = true;

	if(classCode.match(/^[A-Z]{4}[0-9]{3,4}([a-zA-Z0-9]| |-)*$/) === null)
		validInput = false;

	if(className.match(/^ *$/) !== null)
		validInput = false;

	//if(hours.match(/^(mon|tue|wed|thu|fri|sat|sun)\/$/)) //TODO: hours validation, e.g. tue/17:45/20:15,thurs/8:45/10:00
	if(hours.match(/^ *$/) !== null)
		validInput = false;

	//if(location) //TODO: location validation
	if(location.match(/^ *$/) !== null)
		validInput = false;
	
	if(TAs.split(',').every(validEmail) === false)
		validInput = false;

	if(validInput) {

		// Prepare payload; send file as data
		var formData = new FormData();

		formData.append('classcode', classCode);
		formData.append('classname', className);
		formData.append('hours', hours);
		formData.append('location', location);
		formData.append('TAs', TAs);

		var file = $('#studentList').get(0).files[0];
		formData.append('studentList', file, file.name);

		$.ajax({
			url: '/createclass',
			type: 'POST',
			data: formData,
			processData: false,
			contentType: false,
			success: function(response) {
				console.log(response);
			}
		})
	}
	else {
		//TODO: error message
	}
};

function validEmail(email) {
	return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm) !== null;
}