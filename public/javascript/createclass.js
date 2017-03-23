//TODO: event-based field validation for user's benefit
$(document).ready(function() {
	$("#classcode").on("change keyup paste",function() {
        if(validClassCode($("#classcode").val())) {
            $("#classcode").css("border-color", "green");
        }
        else if($("#classcode").val().length == 0) {
            $("#classcode").css("border-color", "gray");
        }
        else {
        	$("#classcode").css("border-color", "red");
        }
    })

	$("#classname").on("change keyup paste",function() {
        if(!isEmpty($("#classname").val())) {
            $("#classname").css("border-color", "green");
        }
        else {
            $("#classname").css("border-color", "gray");
        }
    })

    $("#hours").on("change keyup paste",function() {
        if(!isEmpty($("#hours").val())) {
            $("#hours").css("border-color", "green");
        }
        else {
            $("#hours").css("border-color", "gray");
        }
    })

    $("#hours").on("change keyup paste",function() {
        if(!isEmpty($("#hours").val())) {
            $("#hours").css("border-color", "green");
        }
        else {
            $("#hours").css("border-color", "gray");
        }
    })

    $("#TAs").on("change keyup paste",function() {
        if(TAFieldValid($("#TAs").val())) {
            $("#TAs").css("border-color", "green");
        }
        else if($("#TAs").val().length == 0) {
            $("#TAs").css("border-color", "gray");
        }
        else {
        	$("#TAs").css("border-color", "red");
        }
    })
})

function submitCreateClass() {

	var classCode = $('#classcode').val().toUpperCase();
	var className = $('#classname').val();
	var hours = $('#hours').val();
	var location = $('#location').val();
	var TAs = $('#TAs').val();

	var validInput = true;

	console.log("invalid class code? " + (validClassCode(classCode) !== true));
	if(validClassCode(classCode) !== true)
		validInput = false;

	console.log("invalid className? " + isEmpty(className));
	if(isEmpty(className))
		validInput = false;

	//if(hours.match(/^(mon|tue|wed|thu|fri|sat|sun)\/$/)) //TODO: hours validation, e.g. tue/17:45/20:15,thurs/8:45/10:00
	console.log("invalid hours? " + isEmpty(hours))
	if(isEmpty(hours))
		validInput = false;

	//if(location) //TODO: location validation
	console.log("invalid location? " + isEmpty(location));
	if(isEmpty(location))
		validInput = false;
	
	console.log("invalid TA field values? " + TAFieldValid(TAs) !== true);
	if(TAFieldValid(TAs) !== true)
		validInput = false;

	if(validInput) {
		console.log("Form submit valid...");

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
				window.location.href = "/home";
			},
			failure: function(response) {
				alert("Invalid field data."); //TODO: Do this properly
			}
		})
	}
	else {
		//TODO: error message
		console.log("Error: Form values not valid.");
	}
};

function validClassCode(val) {
	return val.match(/^[A-Z]{4}[0-9]{3,4}([a-zA-Z0-9]| |-)*$/) !== null;
}

function isEmpty(val) {
	return val.match(/^ *$/) !== null;
}

// Does each TA subfield have a valid email address?
function TAFieldValid(val) {
	return val.split(',').every((e) => (validEmail(e.split(":")[0])) && !isEmpty(e.split(":")[1] || ""));
}

function validEmail(email) {
	return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/igm) !== null;
}