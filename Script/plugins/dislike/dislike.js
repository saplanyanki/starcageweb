'use strict';

function doDislike(id) {
	// id = unique id of the message
	jQuery('#dislike_btn'+id).html('<div class="privacy_loader"></div>');
	jQuery('#doDislike'+id).removeAttr('onclick');
	$.ajax({
		type: "POST",
		url: baseUrl + "/plugins/dislike/dislike.php",
		data: "id="+id+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#message-action-dislike'+id).empty();
			jQuery('#message-action-dislike'+id).html(html);
		}
	});
}