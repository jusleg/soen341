function submitCreateClass() {

	// Prepare payload; send file as data
	var formData = new FormData();
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
};