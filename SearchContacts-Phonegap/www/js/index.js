document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	$(document).ready(function() {
		$("body").addClass('ui-disabled').css("background", "#000");
		$.mobile.loading("show");
		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		var filter = [ "displayName", "phoneNumbers"];
		navigator.contacts.find(filter, onSuccess, onError, options);
		bindRefreshContactEvents();
	});
}

function onSuccess(contacts) {
	var html = "", oldphonenum = "";
	
	for ( var i = 0; i < contacts.length; i++) {
		if (($.trim(contacts[i].displayName).length != 0 || $
				.trim(contacts[i].nickName).length != 0)
				&& $.trim(contacts[i].phoneNumbers).length > 0) {
			html += '<li>';
			if (contacts[i].phoneNumbers[0].value != "") {
				html += '<h2>' + contacts[i].displayName ? contacts[i].displayName
						: contacts[i].nickName + '</h2>';
				html += '<ul class="innerlsv" data-role="listview" data-inset="true">';
					for ( var j = 0; j < contacts[i].phoneNumbers.length; j++) {
						var phonenum = contacts[i].phoneNumbers[j].value;
						var phoneytype = contacts[i].phoneNumbers[j].type;
						phonenum = phonenum.replace(/\-/g, '');
						if (oldphonenum != phonenum) {
							phoneytype = phoneytype.toLowerCase().replace(/\b[a-z]/g, function(letter) {
							    return letter.toUpperCase();
							});
							
							html += "<li>"
								+ phoneytype
								+ ": " + phonenum + "<br/>" + "</li>";
						}
						oldphonenum = phonenum;
					}
				html += "</ul>";
			}
			html += '</li>';
		}
	}
	if (contacts.length === 0) {
		html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
		html += '<h2>No Contacts</h2>';
		html += '<label>No Contacts Listed</label>';
		html += '</li>';
	}
	
	$("#contactsList").html(html);
	$("#contactsList").listview().listview('refresh');
	$(".innerlsv").listview().listview('refresh');
	
	$.mobile.loading("hide");
	$("body").removeClass('ui-disabled');
}

function onError(contactError) {
	alert('Unable to fetch contact information.');
	$.mobile.loading("hide");
	$("body").removeClass('ui-disabled');
}

function bindRefreshContactEvents() {
	$("#refreshContacts").on("click", function() {
		$("body").addClass('ui-disabled').css("background", "#000");
		$.mobile.loading("show");
		var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		var filter = [ "displayName", "phoneNumbers" ];
		navigator.contacts.find(filter, onSuccess, onError, options);
	});
}