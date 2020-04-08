$(document).ready(function(){
	$('.close, .modal__back').click(function() {
		$('.checkbox').prop("checked", false);
	  	$('#email').val("");
	  	$('#firstName').val("");
	  	$('#lastName').val("");
	  	$('#phone').val("");
	  	$('#descrEstimate').val("");
	  	$('.secondary__radio').prop("checked", false);
	});
	$('#project').click(function() {
		agree = $('.agree__project').text();
	});
	$('#communications').click(function() {
		agree = $('.agree__communications').text();
	});
	$('.device'). click(function(){
		device = [];
		$("input[name='device']:checked").each(function () {
			device.push($(this).val());
		});
	});
	$('.scope'). click(function(){
		scope = [];
		$("input[name='scope']:checked").each(function () {
			scope.push($(this).val());
		});
	});

	// send form estimate
	$('#formBtnEstimate').click(function() {
		var modal = $('#regModal');
		var email = $('#email').val();
		var firstname = $('#firstName').val();
		var lastname = $('#lastName').val();
		var phone = $('#phone').val();
		var descr = $('#descrEstimate').val();
		var deviceStr = device.toString();
		var scopeStr = scope.toString();

		var leadStatus = 'Interest';
		var contactType = 'Prospect';
		var source = 'Website';
		var leadGeneration = 'Inbound';

		var xhr = new XMLHttpRequest();
    	var url = 'https://api.hsforms.com/submissions/v3/integration/submit/6484354/0faaa5e1-3afa-4aae-b4c0-e6b141f4a3d8'
    	// Example request JSON:
	    var data = {
	      "fields": [
	      	{
	          "name": "device_of_project",
	          "value": deviceStr
	        },
	        {
	          "name": "scope_of_project",
	          "value": scopeStr
	        },
	      	{
	          "name": "email",
	          "value": email
	        },
	        {
	          "name": "firstname",
	          "value": firstname
	        },
	        {
	          "name": "lastname",
	          "value": lastname
	        },
	        {
	          "name": "mobilephone",
	          "value": phone
	        },
	        {
	          "name": "description",
	          "value": descr
	        },
	        {
	          "name": "agreement",
	          "value": agree
	        },
	        {
	          "name": "hs_lead_status",
	          "value": leadStatus
	        },
	        {
	          "name": "contact_type",
	          "value": contactType
	        },
	        {
	          "name": "source",
	          "value": source
	        },
	        {
	          "name": "lead_generation",
	          "value": leadGeneration
	        }
	      ]
	    }
	    var final_data = JSON.stringify(data)
	    xhr.open('POST', url);
	    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
	    xhr.setRequestHeader('Content-Type', 'application/json');
	    xhr.onreadystatechange = function() {
	        if(xhr.readyState == 4 && xhr.status == 200) {
	        	$(modal).show();
	            $('.form__block').addClass('disable');
	       		$('.send__message').addClass('active');
	        } else if (xhr.readyState == 4 && xhr.status == 400){
	        	$(modal).show();
	        	$('.form__block').addClass('disable');
	        	$('.notsend__message').addClass('active');
	        	console.log(xhr.responseText);
	        } else if (xhr.readyState == 4 && xhr.status == 403){
	        	$(modal).show(); 
	            $('.form__block').addClass('disable');
	        	$('.notsend__message').addClass('active');
	        	console.log(xhr.responseText);        
	        } else if (xhr.readyState == 4 && xhr.status == 404){
	        	$(modal).show();
	            $('.form__block').addClass('disable');
	        	$('.notsend__message').addClass('active');
	        	console.log(xhr.responseText);
	        }
	       } 
	    // Sends the request	    
	    xhr.send(final_data)
	});	
});