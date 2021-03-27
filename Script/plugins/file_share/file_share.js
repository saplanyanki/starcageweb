'use strict';

jQuery(document).ready(function() {
	jQuery('body').append('<input type="file" name="chat-file-share" id="chat-file-share" style="display: none;">');
	
	jQuery(document).on('click', '.chat-file-share-btn', function () {
		localStorage.setItem("chat-image-uid", jQuery(this).data("userid"));
	});
	
	jQuery(document).on('change', 'input[name="chat-file-share"]', function () {
		postFileShare();
	});

	jQuery(document).on("click", "label#file-share-button", function() {
		// Clean the old selected files
		jQuery('#file-share-list').empty();
		jQuery('#file-share-list').removeAttr('class');
		jQuery('#file-share-files, #my_file').val('');
		jQuery('#form-value').val(' ');
		
		// Hide all the current plugin divs
		jQuery('#plugins-forms, #plugins-forms div').hide();
		jQuery('.message-form-input, .selected-files').hide();
		
		// Place the inputs
		jQuery('#plugins-forms').append(jQuery('#file-share-location'));
		
		// Show the inputs
		jQuery('#file-share-location, #file-share-location div').show();
		jQuery('#plugins-forms').show('fast');

		// Deselect any other event type if selected
		jQuery('#values label').addClass('selected').siblings().removeClass('selected');
		
		// Add the selected state to the button
		jQuery('#file-share-button').addClass('selected');
	});
	
	jQuery(document).on("change", "#file-share-files", function() {
		// Empty the file lists
		jQuery('#file-share-list').empty();
		
		jQuery('#file-share-list').attr('class', 'file-share-list');
		
		// Read the current files
		var files = jQuery('#file-share-files').prop('files');
		
		// Show the current files
        for (var i = 0; i < files.length; i++){
			jQuery('#file-share-list').append('<div class="file-share-element">'+files[i].name+' <span class="file-share-value">('+file_share_sizeFormat(files[i].size)+')</span></div>');
        }
		if(i == 0) {
			jQuery('#file-share-list').removeClass('file-share-list');
		}
	});
	
	// Remove the input's content when the user's uploading an image
	jQuery(document).on('click', '#my_file', function() {
		document.getElementById("file-share-files").value = "";
	});
});
function file_share_sizeFormat(bytes,decimals) {
   if(bytes == 0) return '0 Byte';
   var k = 1024;
   var dm = decimals + 1 || 3;
   var sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
   var i = Math.floor(Math.log(bytes) / Math.log(k));
   return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
}
function postFileShare() {
	// Type 1: Camera stream capture
	var id = localStorage.getItem('chat-image-uid');
	chatInput(0, id);
	
	var formData = new FormData();
	
	// Build the form
	formData.append("id", id);
	formData.append("type", "plugin");
	formData.append("token_id", token_id);
	formData.append("file-share-files", jQuery('input[name="chat-file-share"]')[0].files[0]);
	
	// Check whether when the input has changed has a file selected
	if(typeof(jQuery('input[name="chat-file-share"]')[0].files[0]) == "undefined") {
		chatInput(1, id);
		
		return false;
	}
	
	// Send the request
	var ajax = new XMLHttpRequest;
	ajax.open('POST', baseUrl+"/requests/post_chat.php", true);
	ajax.send(formData);
	
	ajax.onreadystatechange = function() {
		if(ajax.readyState == XMLHttpRequest.DONE) {
			// Check if in the mean time any message was sent
			checkChat(1, id);
			
			// Append the new chat to the div chat container
			jQuery('#bc-friends-chat-'+id).append(ajax.responseText);
			jQuery('#chat-container-'+id).append(ajax.responseText);
			
			chatInput(1, id);
			
			if(jQuery('#chat-container-'+id).length) {
				jQuery('#chat-container-'+id).scrollTop(jQuery('.chat-container')[0].scrollHeight);
			}
			if(jQuery('#bc-friends-chat-'+id).length) {
				jQuery('#bc-friends-chat-'+id).scrollTop(jQuery('.bc-friends-chat')[0].scrollHeight);
			}
			jQuery("div.timeago").timeago();
			jQuery('.last-online[data-last-online="'+id+'"]').remove();
		}
	}
}