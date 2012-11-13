$(function() {
	
	$('#submit').click(function() {
		
		var email = $('#email').val();
		var pass = $('#pass').val();
		
		if (email == '' || pass == '') {
			alert('Please enter in your email and password');
			return false;
		}
		
		$.post(Global.BaseUrl + '/login', { email: email, pass: pass }, function(data) {
			if (data.status == 'success') {
				window.location.reload();
			} else {
				alert('Error: ' + data.body);
				return false;
			}
		}, 'json');
		
	});
	
	$('input').keypress(function(e) {
		if(e.keyCode == 13) {
			$('#submit').focus().click();
		}
	});
	
});