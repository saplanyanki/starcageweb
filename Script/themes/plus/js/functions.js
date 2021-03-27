'use strict';

function autosize() {
	// auto adjust the height of
	jQuery('body').on('keyup', 'textarea', function() {
		jQuery(this).height(0);
		jQuery(this).height((this.scrollHeight-10));
	});
}
function showButton(id) {
	jQuery('#comment_box_'+id).append(jQuery('#comments-controls'));
	jQuery('#comments-controls'+id).show();
}
function loadComments(id, cid, start) {
	jQuery('#more_comments_'+id).html('<div class="preloader preloader-center"></div>');
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_comments.php",
		data: "id="+id+"&start="+start+"&cid="+cid+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			// Remove the loader animation
			jQuery('#more_comments_'+id).remove();
			
			// Append the new comment to the div id
			jQuery('#comments-list'+id).prepend(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
		}
	});
}
function loadFeed(start, filter) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_feed.php",
		data: "start="+start+q+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadPage(start, page) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_page.php",
		data: "start="+start+"&page="+page+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadGroup(start, group) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_group.php",
		data: "start="+start+"&group="+group+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadPeople(start, value, filter, age) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	if(filter == '') {
		filter = '';
	} else {
		filter = '&filter='+filter;
	}
	if(age == '') {
		age = ''
	} else {
		age = '&age='+age;
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_people.php",
		data: "start="+start+'&q='+encodeURIComponent(value)+filter+age+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadProfile(start, filter, profile) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	if(filter == '') {
		window.q = '';
	} else {
		window.q = '&filter='+filter;
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_profile.php",
		data: "profile="+profile+"&start="+start+q+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadHashtags(start, value, filter) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	if(filter == null) {
		var filter = '';
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_tags.php",
		data: "start="+start+'&q='+value+'&filter='+filter+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadSubs(start, type, profile) {
	jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_friends.php",
		data: "id="+profile+"&start="+start+"&type="+type+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_messages').remove();
			
			// Append the new comment to the div id
			jQuery('#messages').append(html);
		}
	});
}
function loadBlocked(start) {
	jQuery('#more_users').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_blocked.php",
		data: "&start="+start+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_users').remove();
			
			// Append the new comment to the div id
			jQuery('#users').append(html);
		}
	});
}
function postComment(id) {
	var comment = jQuery('#comment-form'+id).val();
	
	jQuery('#post_comment_'+id).html('<div class="preloader preloader-center"></div>');
	
	// Remove the post button
	jQuery('#comments-controls'+id).hide();
	
	// Show the loading animation
	jQuery('#action-loader'+id).html('<div class="privacy_loader"></div>');
	
	var formData = new FormData();
	
	// Build the form
	formData.append("id", id);
	formData.append("comment", comment);
	formData.append("token_id", token_id);
	
	if(typeof(jQuery('#commentimage'+id)[0].files[0]) !== "undefined") {

		formData.append("type", "picture");
		formData.append("value", jQuery('#commentimage'+id)[0].files[0]);
	}
	
	// Send the request
	var ajax = new XMLHttpRequest;
	ajax.open('POST', baseUrl+"/requests/post_comment.php", true);
	ajax.send(formData);
	
	ajax.onreadystatechange = function() {
		if(ajax.readyState == XMLHttpRequest.DONE) {
			try {
				var result = jQuery.parseJSON(ajax.responseText);
				
				// Append the new comment to the div id
				jQuery('#comments-list'+id).append(result.content);
				jQuery('#message-action'+id).html(result.actions);
				
				// Fade In the style="display: none" class
				jQuery('.message-reply-container').fadeIn(500);
				
				// Reload the timeago plugin
				jQuery(".timeago").timeago('updateFromDOM');
				
				// Empty the text area
				jQuery('#comment-form'+id).val('');
			} catch(e) {
				
			}
			
			// Remove the loader animation
			jQuery('#post_comment_'+id).html('');
			jQuery('#action-loader'+id).html('');
			jQuery('#mentions-container').remove();
		}
	}
	
	// Reset the form's height
	jQuery('#comment-form'+id).height(0);
	
	// Reset the image input
	jQuery('#commentimage'+id).val('');
	
	// Clear the queue preview
	jQuery('#queued-comment-files'+id).html('');
}
function share(id) {
	jQuery('#share').fadeIn();
	jQuery('.modal-background').fadeIn();
	
	jQuery('#share-close').hide();
	jQuery('#share-btn').show();
	jQuery('#share-cancel').show();
	
	jQuery('#share-btn').attr('onclick', 'doShare('+id+', 1)');
}
function doShare(id, type) {
	if(type) {
		jQuery('#share-btn').hide();
		jQuery('#share-cancel').hide();
		jQuery('#share-close').show();
		jQuery('#share-desc').hide();
		jQuery('#share-result').show();
		jQuery('#share-result').html('<div class="preloader preloader-center"></div>');
		jQuery('#action-loader'+id).html('<div class="privacy_loader"></div>');
		
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/share.php",
			data: "id="+id+"&token_id="+token_id, 
			cache: false,
			success: function(html) {
				var result = jQuery.parseJSON(html);
				jQuery('#share-result').html(result.content);
				jQuery('#message-action'+id).html(result.actions);
			}
		});
	} else {
		hideModal();
	}
}
function deleteModal(id, type, parent) {
	if(type == 999) {
		hideModal();
	} else {
		jQuery('#delete0, #delete1, #delete2').hide();
		jQuery('#delete'+type).show();
		
		jQuery('#delete').fadeIn();
		jQuery('.modal-background').fadeIn();
		
		jQuery('#delete-btn').show();
		jQuery('#delete-cancel').show();
		
		if(type == 0) {
			jQuery('#delete-btn').attr('onclick', 'delete_the('+id+', '+type+', '+parent+')');
		} else {
			jQuery('#delete-btn').attr('onclick', 'delete_the('+id+', '+type+')');
		}
	}
}
function cameraModal(type) {
	// Type 0: Display the camera modal along with the video stream
	// Type 1: Close the modal
	// Type 2: Take a screenshot of the camera stream
	if(type == 1) {
		hideModal();
	} else if(type == 2) {
		// Elements for taking the snapshot
		var canvas = document.getElementById('camera-canvas');
		window.cameraCapture = canvas.getContext('2d');
		
		cameraCapture.drawImage(videoStream, 0, 0, 380, 285);
		jQuery('#camera-video, #camera-btn').hide();
		jQuery('#camera-canvas').fadeIn(); // Adds in the snap photo effect (opacity from 1 to 0)
		jQuery('#camera-send-btn').show();
	} else {
		jQuery('#camera').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('#camera-btn').show();
		jQuery('#camera-cancel').show();
		
		// Get and set the video element
		window.videoStream = document.getElementById('camera-video')

		// Require access to the camera
		if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// The camera options
			var options = {
				video: true,
				audio: false
			}
			
			navigator.mediaDevices.getUserMedia(options).then(function(stream) {
				window.cameraStream = stream;
				
				// Set the content to the camera stream
				try {
					videoStream.srcObject = stream;
				} catch (error) {
					videoStream.src = window.URL.createObjectURL(stream);
				}
				
				// Start playing the camera stream
				videoStream.play();
			}).catch(function(err) {
				// Display the error
				var canvas = document.getElementById('camera-canvas');
				window.cameraCapture = canvas.getContext('2d');
				cameraCapture.font = "16px sans-serif";
				cameraCapture.fillStyle = "#AAA";
				cameraCapture.fillText(err.name + ": " + err.message, 10, 20);
				jQuery('#camera-video, #camera-btn, #camera-send-btn').hide();
				jQuery('#camera-canvas').show();
			});
		} else {
			console.log('This browser does not support WebRTC');
		}
	}
}
function likesModal(id, type, close) {
	// Type 0: Message, Type 1: Comment
	if(close) {
		hideModal();
	} else {
		jQuery('#likes').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('#likes-result').html('<div class="modal-listing-load-more"><div class="preloader preloader-center"></div></div>');
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/load_likes.php",
			data: "id="+id+"&extra="+type+"&token_id="+token_id, 
			cache: false,
			success: function(html) {
				jQuery('#likes-result').html(html);
			}
		});
	}
}
function sharesModal(id, close) {
	// Type 0: Message, Type 1: Comment
	if(close) {
		hideModal();
	} else {
		jQuery('#shares').fadeIn();
		jQuery('.modal-background').fadeIn();
		jQuery('#shares-result').html('<div class="modal-listing-load-more"><div class="preloader preloader-center"></div></div>');
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/load_shares.php",
			data: "id="+id+"&token_id="+token_id, 
			cache: false,
			success: function(html) {
				jQuery('#shares-result').html(html);
			}
		});
	}
}
function hideModal() {
	jQuery('#share').fadeOut(400, function() {
		jQuery('#share-desc').show();
		jQuery('#share-result').hide();
	});
	jQuery('#delete, #likes, #camera, #shares, .modal-background').fadeOut();
	
	// Stop the camera stream
	if(typeof cameraStream != 'undefined') {
		cameraStream.getTracks()[0].stop();
	}
	jQuery('#camera-canvas, #camera-send-btn').hide();
	jQuery('#camera-video, #camera-btn').show();
}
function loadLikes(start, id, type, extra) {
	
	var query = "start="+start+"&id="+id+"&extra="+extra;
	jQuery('#more-likes').html('<div class="modal-listing-load-more"><div class="preloader preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_likes.php",
		data: query+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			// Append the new comment to the div i
			jQuery('#likes-result').append(html);
			jQuery('#more-likes').remove();
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function loadShares(start, id) {
	jQuery('#more-shares').html('<div class="modal-listing-load-more"><div class="preloader preloader-center"></div></div>');

	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_shares.php",
		data: "start="+start+"&id="+id+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			// Append the new comment to the div i
			jQuery('#shares-result').append(html);
			jQuery('#more-shares').remove();
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
			
			autosize();
		}
	});
}
function hideSearch() {
	jQuery(".search-container").hide();
	jQuery(".search-content").remove();
}
function delete_the(id, type, parent) {
	// id = unique id of the message/comment/chat
	// type = type of post: message/comment/chat
	hideModal();
	
	if(type == 0) {
		jQuery('#comment'+id).fadeOut(500, function() { jQuery('#comment'+id).remove(); });
		jQuery('#action-loader'+parent).html('<div class="privacy_loader"></div>');
	} else if(type == 1) {
		jQuery('#message'+id).fadeOut(500, function() { jQuery('#message'+id).remove(); });
	} else if(type == 2) {
		jQuery('div[data-chat-id="'+id+'"]').fadeOut(500, function() { jQuery('div[data-chat-id="'+id+'"]').remove(); });
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/delete.php",
		data: "message="+id+"&type="+type+"&parent="+parent+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			if(type == 0) {
				var result = jQuery.parseJSON(html);
				jQuery('#message-action'+parent).html(result.actions);
			}
		}
	});
}
function edit_message(id, type) {
	if(type) {
		jQuery('#message_loader'+id).html('<div class="preloader preloader-center"></div>');
		
		// Store the new message
		var message = jQuery('#edited_message'+id).val();
		
		// Remove the inputs
		jQuery('#edit-message'+id).remove();
		
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/post_edit.php",
			data: "message="+encodeURIComponent(message)+"&id="+id+"&token_id="+token_id,
			cache: false,
			success: function(html) {
				jQuery('#message_loader'+id).empty();
				if(html) {
					// Update the message's content
					var content = html
					jQuery('#message_text'+id).html(html);
					jQuery('#message_text'+id).show();
				} else {
					// If the message wasn't updated, show the old one
					jQuery('#message_text'+id).show();
				}
			}
		});
	} else {
		// Show the edit box
		jQuery('#edit-message'+id).remove();
		
		var text = jQuery('#message_text'+id).text();
		var button = '<div class="edit-btn-container"><div type="button" name="edit" class="edit-btn button-active" value="'+jQuery('#edit_text'+id).html()+'"><a onclick="edit_message('+id+', 1)">'+jQuery('#edit_text'+id).html()+'</a></div></div>';
		jQuery('#message_text'+id).hide();
		jQuery('#message_text'+id).after('<div class="message-message" id="edit-message'+id+'"><div class="message-editing"><textarea id="edited_message'+id+'">'+$.trim(text)+'</textarea>'+button+'</div></div>');
		
		jQuery('#edited_message'+id).focus();
	}
}
function edit_comment(id, type, pid) {
	if(type) {
		jQuery('#action-loader'+pid).html('<div class="privacy_loader"></div>');
		
		// Store the new message
		var message = jQuery('#edited_comment'+id).val();
		
		// Remove the inputs
		jQuery('#edit-comment'+id).remove();
		
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/post_edit.php",
			data: "message="+encodeURIComponent(message)+"&id="+id+"&type=1&token_id="+token_id,
			cache: false,
			success: function(html) {
				jQuery('#action-loader'+pid).empty();
				if(html) {
					// Update the message's content
					var content = html
					jQuery('#comment_text'+id).html(html);
					jQuery('#comment_text'+id).show();
				} else {
					// If the message wasn't updated, show the old one
					jQuery('#comment_text'+id).show();
				}
			}
		});
	} else {
		// Show the edit box
		jQuery('#edit-comment'+id).remove();
		
		var text = jQuery('#comment_text'+id).text();
		var button = '<div class="edit-btn-container"><div type="button" name="edit" class="edit-btn button-active" value="'+jQuery('#edit_text_c'+id).html()+'"><a onclick="edit_comment('+id+', 1, '+pid+')">'+jQuery('#edit_text_c'+id).html()+'</a></div></div>';
		jQuery('#comment_text'+id).hide();
		jQuery('#comment_text'+id).after('<div class="message-message" id="edit-comment'+id+'"><textarea id="edited_comment'+id+'" class="comment-reply-textarea">'+$.trim(text)+'</textarea>'+button+'</div>');
		
		jQuery('#edited_comment'+id).focus();
	}
}
function report_the(id, type) {
	// id = unique id of the message/comment
	// type = type of post: message/comment
	
	if(type == 0) {
		jQuery('#comment'+id).html('<div class="message-reported"><div class="preloader"></div></div>');
	} if(type == 1) {
		jQuery('#message_loader'+id).html('<div class="preloader preloader-center"></div>');
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/report.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			if(type == 0) {
				jQuery('#comment'+id).html('<div class="message-reported">'+html+'</div>');
			} if(type == 1) {
				jQuery('#message'+id).html('<div class="message-content"><div class="message-inner">'+html+'</div></div>');
			}
		}
	});
}
function friend(id, type, z) {
	// id = unique id of the viewed profile
	// type 1: send, approve or cancel a friend request
	// type 2: approve a friend request from the notifications widget
	// type 3: decline a friend request from the notifications widget
	// z if on, activate the sublist class which sets another margin (friends dedicated profile page)
	
	if(type == 2 || type == 3) {
		jQuery('#notification-buttons'+z).empty();
	} else {
		if(z == 1) {
			jQuery('#friend'+id).html('<div class="sub-loading subslist"></div>');
		} else {
			jQuery('#friend'+id).html('<div class="sub-loading"></div>');
			jQuery('#friend-card-'+id).html('<div class="sub-loading"></div>');
		}
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/friend.php",
		data: "id="+id+"&type="+type+"&z="+z+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			if(type == 2 || type == 3) {
				jQuery('#notification-buttons'+z).html(html);
			} else {
				jQuery('#friend-card-'+id).html(html);
				jQuery('#friend'+id).html(html);
			}
		}
	});
}
function loadNotifications(start, ln, cn, sn, fn, dn, bn, gn, pn, xn, mn) {
	if(ln) {
		var filter = 'likes';
	} else if(cn) {
		var filter = 'comments';
	} else if(sn) {
		var filter = 'shared';
	} else if(fn) {
		var filter = 'friendships';
	} else if(dn) {
		var filter = 'chats';
	} else if(bn) {
		var filter = 'birthdays';
	} else if(gn) {
		var filter = 'groups';
	} else if(pn) {
		var filter = 'pokes';
	} else if(xn) {
		var filter = 'pages';
	} else if(mn) {
		var filter = 'mentions';
	}
	
	jQuery('#more_users').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_notifications.php",
		data: "start="+start+"&filter="+filter+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_users').remove();
			jQuery('#notifications-page').append(html);
			jQuery(".timeago").timeago('updateFromDOM');
		}
	});
}
function page(type, user, id, profile) {
	// Type: Search Results
	// User: User ID
	// ID: Page ID
	// Profile: Profile ID
	
	if(type == 1 || profile) {
		jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	} else if(type == 2) {
		jQuery('#more_users').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	} else {
		jQuery('#page-invite-'+user).fadeOut(500, function() { jQuery('#page-invite-'+user).remove(); });
	}
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/page.php",
		data: "page="+id+"&user="+user+"&type="+type+"&profile="+profile+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			if(type == 1 || profile) {
				jQuery('#more_messages').remove();
				jQuery('#messages').append(html);
			} else if(type == 2) {
				jQuery('#more_users').remove();
				jQuery('#pages').append(html);
			}
		}
	});
}
function group(type, value, group, user, id) {
	// Type: The type of the request
	// Value: Values container
	// Group: Group ID
	// User: User ID
	
	// Type 0: Manage Users
	// Type 1: Load Users
	// Type 6: Join, Leave group

	if(type == 1) {
		jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	} else if(type == 2) {
		jQuery('#message_loader'+value).html('<div class="preloader preloader-center"></div>');
		jQuery('#message'+value).fadeOut(500, function() { jQuery('#message'+value).remove(); });
	} else if(type == 3) {
		jQuery('#more_messages').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	} else if(type == 5) {
		jQuery('#more_users').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	} else if(type == 6) {
		jQuery('#group-btn-'+group).html('<div class="sub-loading"></div>');
	} else if(type == 7) {
		jQuery('#group-invite-'+value).fadeOut(500, function() { jQuery('#group-invite-'+value).remove(); });
	} else {
		jQuery('#group-request-'+id).fadeOut(500, function() { jQuery('#group-request-'+id).remove(); });
	}
	if(value == 0 && type == 0) {
		jQuery('.message-container[data-userid="'+user+'"').fadeOut(500, function() { jQuery('.message-container[data-userid="'+user+'"').remove() });
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/group.php",
		data: "type="+type+"&value="+value+"&group="+group+"&user="+user+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			if(type == 1) {
				jQuery('#more_messages').remove();
			
				// Append the new comment to the div id
				jQuery('#messages').append(html);
			} else if(type == 3) {
				jQuery('#more_messages').remove();
				
				// Append the new comment to the div id
				jQuery('#messages').append(html);
			} else if(type == 5) {
				if(user) {
                    jQuery('#more_messages').remove();
					jQuery('#messages').append(html);
				} else {
                    jQuery('#more_users').remove();
					jQuery('#groups').append(html);
				}
			} else if(type == 6) {
				jQuery('#group-btn-'+group).html(html);
				// Hide the post message form when leaving the group
				if(html.search('join-button') > 0) {
					jQuery('#postForm').unwrap();
					jQuery('#postForm').remove();
				}
			}
		}
	});
}
function deleteNotification(type, id) {
	if(type == 0) {
		jQuery('#notification'+id).fadeOut(500, function() { jQuery('#notification'+id).remove(); });
	} else if(type == 1) {
		jQuery('#post_comment_'+id).fadeOut(500, function() { jQuery('#post_comment_'+id).remove(); });
	}
}
function privacy(id, value) {
	// id = unique id of the message/comment
	// value = value to set on the post
	jQuery('#privacy'+id).empty();
	jQuery('#message_loader'+id).html('<div class="preloader preloader-center"></div>');
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/privacy.php",
		data: "message="+id+"&value="+value+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#message_loader'+id).empty();
			jQuery('#privacy'+id).html(html);
			if(value == 0) {
				jQuery('#comment_box_'+id).hide('slow');
			} else {
				jQuery('#comment_box_'+id).show('slow');
			}
		}
	});
}
function manage_the(start, type, filter) {
	// filter = a users filter (normal, verified and moderators)
	if(type == 1) {
		type = 'reports';
	} else {
		type = 'users';
	}
	jQuery('#more_users').html('<div class="load_more"><div class="preloader preloader-center"></div></div>');
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/manage_"+type+".php",
		data: "start="+start+"&filter="+filter+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			jQuery('#more_users').remove();
			
			// Append the new comment to the div id
			jQuery('#'+type).append(html);
		}
	});
}
function manage_report(id, type, post, kind) {
	jQuery('#report'+id).html('<div class="preloader"></div>');
	jQuery('#report'+id).fadeOut(500, function() { jQuery('#message'+id).remove(); });
	
	// Subtract from the notifications number
	var notifCount = jQuery('.admin-notifications-number').text();
	jQuery('.admin-notifications-number').text(notifCount-1);
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/manage_reports.php",
		data: "id="+id+"&type="+type+"&post="+post+"&kind="+kind+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
		}
	});
}
function doLike(id, type) {
	// id = unique id of the message
	// type = 0 for messages, 1 for comments, 2 for pages
	if(type == 1) {
		jQuery('#action-c-loader'+id).html('<div class="privacy_loader"></div>');
		// Store the onclick attribute value and temporary remove it
		var attrVal = jQuery('#doLikeC'+id).attr('onclick');
		jQuery('#doLikeC'+id).removeAttr('onclick');
	} else if(type == 2) {
		jQuery('#page-btn-'+id).html('<div class="sub-loading"></div>');
		jQuery('#page-card-'+id).html('<div class="sub-loading"></div>');
	} else {
		jQuery('#action-loader'+id).html('<div class="privacy_loader"></div>');
		// Store the onclick attribute value and temporary remove it
		var attrVal = jQuery('#doLike'+id).attr('onclick');
		jQuery('#doLike'+id).removeAttr('onclick');
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/like.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			if(type !== 2) {
				var result = jQuery.parseJSON(html);
			}
			if(type == 1) {
				jQuery('#doLikeC'+id).html(result.value);
				// Add the onclick event to the Like button
				jQuery('#doLikeC'+id).attr('onclick', attrVal);
				jQuery('#comment-action'+id).html(result.actions);
				jQuery(".timeago").timeago('updateFromDOM');
			} else if(type == 2) {
				jQuery('#page-btn-'+id).html(html);
				jQuery('#page-card-'+id).html(html);
			} else {
				jQuery('#doLike'+id).html(result.value);
				// Add the onclick event to the Like button
				jQuery('#doLike'+id).attr('onclick', attrVal);
				jQuery('#message-action'+id).html(result.actions);
			}
		}
	});
}
function doBlock(id, type) {
	// id = unique id of the user
	// type 0: do nothing, just display the block, type 1: do/undo block
	jQuery('.blocked-link').html('<div class="privacy_loader"></div>');
	jQuery('#blocked'+id).remove();
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/block.php",
		data: "id="+id+"&type="+type+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			// Display the block on the Messages page
			jQuery('.blocked-link').html(html);
			
			// Display the block on the profile [...] menu 
			jQuery('#block'+id).html(html);
			
			// Reopen the profile [...] menu
			messageMenu('-profile-extra', 1);
		}
	});
}
function poke(id) {
	// id = unique id of the user
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/poke.php",
		data: "id="+id+"&token_id="+token_id, 
		cache: false,
		success: function(html) {
			// Display the block on the profile [...] menu 
			jQuery('#poke'+id).html(html);
			
			// Reopen the profile [...] menu
			messageMenu('-profile-extra', 1);
		}
	});
}
function showNotification(x, y) {
	// Y1: Show the global notifications
	// Y2: Show the messages notifications
	// Y3: Show the friends notifications
	jQuery('#messages_btn').removeClass('menu_btn_hover');
	jQuery('#notifications_btn').removeClass('menu_btn_hover');
	jQuery('#friends_btn').removeClass('menu_btn_hover');
	
	if(x == 'close') {
		jQuery('.notification-container').hide();
		jQuery('#messages_btn').removeClass('menu_btn_hover');
		jQuery('#notifications_btn').removeClass('menu_btn_hover');
		jQuery('#friends_btn').removeClass('menu_btn_hover');
		jQuery('#notifications-content').empty();
		// Check the notification state
		// Prevent from double instance when loadpage
		if(typeof notificationState != 'undefined') {
			if(notificationState == false) {
				checkNewNotifications();
			}
		}
	} else {
		// Stop checking for new notifications while reading them
		clearTimeout(stopNotifications);
		notificationState = false;
		
		jQuery('.notification-container').show();
		if(y == 1) {
			jQuery('#notifications_btn').addClass('menu_btn_hover');
			jQuery('#notifications_btn').html(getNotificationImage());
			
			// Show or hide the divs from the notifications container header
			jQuery('#global_page_url').show();
			jQuery('#chat_page_url').hide();
			jQuery('#friends_page_url').hide();
			var extra = "";
		} else if(y == 2) {
			jQuery('#messages_btn').addClass('menu_btn_hover');
			jQuery('#messages_btn').html(getMessagesImageUrl(1));
			
			// Show or hide the divs from the notifications container header
			jQuery('#global_page_url').hide();
			jQuery('#chat_page_url').show();
			jQuery('#friends_page_url').hide();
			
			var extra = '&for=1';
		} else if(y == 3) {
			jQuery('#friends_btn').addClass('menu_btn_hover');
			jQuery('#friends_btn').html(getFriendsImage());
			
			// Show or hide the divs from the notifications container header
			jQuery('#global_page_url').hide();
			jQuery('#chat_page_url').hide();
			jQuery('#friends_page_url').show();
			
			var extra = '&for=3';
		}
		jQuery('#notifications-content').html('<div class="notification-inner"><div class="preloader"></div></div>');
		
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/check_notifications.php",
			data: "type=1"+extra+"&token_id="+token_id,
			cache: false,
			success: function(html) {
				if(html) {
					jQuery('#notifications-content').html(html);
					jQuery(".timeago").timeago('updateFromDOM');
				}
			}
		});
	}
}
function checkNewMessages() {
	var last = jQuery('.last-message').data("last");
	var filter = jQuery('.last-message').data("filter");
	var profile = jQuery('.last-message').data("username");
	var type = jQuery('.last-message').data("type");
	
	// Check the current page and if there's no extra filter applied
	if( window.location.search.indexOf('a=feed') > -1
	|| (window.location.search.indexOf('a=profile') > -1 && window.location.search.indexOf('&r=') == -1)
	|| (window.location.search.indexOf('page&name=') > -1 && window.location.search.indexOf('&r=') == -1 && window.location.search.indexOf('&friends=') == -1)
	|| (window.location.search.indexOf('group&name=') > -1 && window.location.search.indexOf('&r=') == -1 && window.location.search.indexOf('&search=') == -1 && window.location.search.indexOf('&friends=') == -1)
	|| (window.location.pathname.indexOf('/feed') > -1)
	// Check if the current page is a profile and it is not on a subpage (for example /about)
	// But also make sure the user's username is not About, case in which, it should work if not on the subpage /about
	|| (window.location.pathname.indexOf('/profile/') > -1 && ['about', 'friends', 'groups', 'likes', 'delete'].indexOf(window.location.pathname.split("/").pop()) == -1)
	|| (window.location.pathname.indexOf('/page/') > -1 && ['likes', 'edit', 'delete'].indexOf(window.location.pathname.split("/").pop()) == -1)
	|| (window.location.pathname.indexOf('/group/') > -1 && ['members', 'admins', 'requests', 'blocked', 'edit', 'delete'].indexOf(window.location.pathname.split("/").pop()) == -1)
	) {
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/check_messages.php",
			data: "last="+last+"&filter="+filter+"&profile="+profile+"&type="+type+"&token_id="+token_id, 
			success: function(html) {
				 // html is a string of all output of the server script.
				if(html) {
					jQuery('#load-content').after('<div id="temphide'+last+'">'+html+'</div>');
					
					// Remove the duplicated message if exists
					var last = jQuery('.last-message').data("last");
					jQuery('.last-message[data-last="'+last+'"]:gt(0)').remove();
					
					jQuery('#temphide'+last).hide().fadeIn('slow');
				}
				jQuery(".timeago").timeago('updateFromDOM');
		   }
		});
	}
	window.stopNewMessages = setTimeout(checkNewMessages, checkMessageTimeout);
}
function postChatImage(type) {
	// Type 1: Camera stream capture
	var id = localStorage.getItem('chat-image-uid');
	jQuery('#c-w-'+id).val('');
	chatInput(0, id);
	
	var formData = new FormData();
	
	// Build the form
	formData.append("id", id);
	formData.append("type", "picture");
	formData.append("token_id", token_id);
	if(type) {
		formData.append("message", document.getElementById('camera-canvas').toDataURL());
		cameraModal(1);
	} else {
		// Check whether when the input has changed has a file selected
		if(typeof(jQuery('input[name=chatimage]')[0].files[0]) == "undefined") {
			chatInput(1, id);
			
			return false;
		}
	}
	formData.append("image", jQuery('input[name=chatimage]')[0].files[0]);
	
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
				jQuery('#chat-container-'+id).scrollTop(jQuery('#chat-container-'+id+'.chat-container')[0].scrollHeight);
			}
			if(jQuery('#bc-friends-chat-'+id).length) {
				jQuery('#bc-friends-chat-'+id).scrollTop(jQuery('#bc-friends-chat-'+id+'.bc-friends-chat')[0].scrollHeight);
			}
			jQuery('.last-online[data-last-online="'+id+'"]').remove();
			jQuery(".timeago").timeago('updateFromDOM');
		}
	}
}
function postChat(id, type) {
	// Type 1: Messages page
	// Type 2: Chat window
	if(type == 1) {
		// Store the message into var
		var message = jQuery('input#chat').val();
		var uid = jQuery('#chat').attr('class');
		var id = uid.replace('chat-user', '');		
		document.getElementById("chat").style.height = "25px";
		
		// Show the progress animation
		jQuery('.message-loader').show();
	} else {
		var message = jQuery('input#c-w-'+id).val();
		jQuery('#c-w-'+id).hide();
		jQuery('#c-w-p-'+id).show();
	}
	// Reset the chat input area
	jQuery('#c-w-'+id).val('');
	jQuery('.chat-user'+id).val('');
	
	// Remove chat errors if any
	jQuery('.chat-error').remove();
	
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/post_chat.php",
		data: 'message='+encodeURIComponent(message)+'&id='+id+'&token_id='+token_id,
		cache: false,
		success: function(html) {
			// Check if in the mean time any message was sent
			checkChat(1, id);
			
			// Append the new chat to the div chat container
			jQuery('#bc-friends-chat-'+id).append(html);
			jQuery('#chat-container-'+id).append(html);
			if(type == 1) {
				jQuery('.message-loader').hide();
			} else {
				jQuery('#c-w-'+id).show();
				jQuery('#c-w-'+id).focus();
				jQuery('#c-w-p-'+id).hide();
			}
			if(jQuery('#chat-container-'+id).length) {
				jQuery('#chat-container-'+id).scrollTop(jQuery('.chat-container')[0].scrollHeight);
			}
			if(jQuery('#bc-friends-chat-'+id).length) {
				jQuery('#bc-friends-chat-'+id).scrollTop(jQuery('.bc-friends-chat')[0].scrollHeight);
			}
			jQuery('.last-online[data-last-online="'+id+'"]').remove();
			jQuery(".timeago").timeago('updateFromDOM');
		}
	});
}
function chatInput(type, id) {
	// Type 0: Show the input, hide preloaders
	// Type 1: Hide the input, show preloaders
	if(type) {
		jQuery('#c-w-'+id).show();
		jQuery('#c-w-'+id).focus();
		jQuery('#c-w-p-'+id).hide();
		jQuery('#m-p-'+id).hide();
	} else {
		jQuery('#c-w-'+id).hide();
		jQuery('#c-w-p-'+id).show();
		jQuery('#m-p-'+id).show();
	}
}
function checkChat(x, id) {
	// x 1: Get the last chat message after a chat message has been posted
	// x 2: Get the last messages for every all chat windows
	if(typeof friends_windows === 'undefined') {
		window.friends_windows = [];
	}
	
	if(x == 1) {
		var freq = "&uid="+id;
	} else {
		var freq = "";
	}
	// Check whether uid is defined or not [prevent from making requests when leaving the chat page]
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_chat.php",
		data: "friends="+friends_windows+"&type="+x+freq+"&token_id="+token_id,
		success: function(html) {
			 // html is a string of all output of the server script.
			if(html) {
				if(x == 2) {
					var result = jQuery.parseJSON(html);
					jQuery('#friends-count').html(result.friends_chat.friends_count);
					
					var searchQuery = jQuery('#search-window').val();
					
					// Prevent replacing the search results
					if(searchQuery == "") {
						jQuery('#friends-list').html(result.friends_chat.friends_list);
					}
					for(var message_id in result.friends_messages) {
						jQuery('#online-status-'+message_id).html(result.friends_messages[message_id].status);
						
						// If a new message is received
						try {
							if(result.friends_messages[message_id].message.length) {
								if(!jQuery('#c-w-'+message_id).is(':focus')) {
									jQuery('#chat-header-'+message_id).addClass('bc-friends-header bc-friends-header-animated');
								}
								jQuery('#chat-container-'+message_id).append(result.friends_messages[message_id].message);
								jQuery('#bc-friends-chat-'+message_id).append(result.friends_messages[message_id].message);

								if(jQuery('#chat-container-'+message_id).length) {
									jQuery('#chat-container-'+message_id).scrollTop(jQuery('#chat-container-'+message_id+'.chat-container')[0].scrollHeight);
								}
								if(jQuery('#bc-friends-chat-'+message_id).length) {
									jQuery('#bc-friends-chat-'+message_id).scrollTop(jQuery('#bc-friends-chat-'+message_id+'.bc-friends-chat')[0].scrollHeight);
								}
								jQuery('.last-online[data-last-online="'+message_id+'"]').remove();
								notificationTitle(1);
							}
						} catch(err) {

						}
					}
				} else if(x == 1) {
					jQuery('#chat-container-'+id).append(html);
					jQuery('#bc-friends-chat-'+id).append(html);
					
					if(jQuery('#chat-container-'+id).length) {
						jQuery('#chat-container-'+id).scrollTop(jQuery('.chat-container')[0].scrollHeight);
					}
					if(jQuery('#bc-friends-chat-'+id).length) {
						jQuery('#bc-friends-chat-'+id).scrollTop(jQuery('.bc-friends-chat')[0].scrollHeight);
					}
					jQuery('.last-online[data-last-online="'+uid+'"]').remove();
					notificationTitle(1);
				}
				if(x == 2) {
					setTimeout(function() { checkChat(2) }, chatr);
				}
				jQuery(".timeago").timeago('updateFromDOM');
			}
		}
	});
}
function loadChat(uid, cid, start, z) {
	// Z 1: Chat Windows
	// Z 0: Messages Page
	if(z) {
		jQuery('#l-m-c-'+uid).html('<div class="preloader preloader-center"></div>');
	} else {
		jQuery('#l-m-c').html('<div class="preloader preloader-center"></div>');
	}
	$.ajax({
		type: "POST",
		url: baseUrl+"/requests/load_chat.php",
		data: "uid="+uid+"&cid="+cid+"&start="+start+"&for="+z+"&token_id="+token_id,
		cache: false,
		success: function(html) {
			// Append the new comment to the div id
			if(z == 1) {
				jQuery('#l-m-c-'+uid).remove();
				jQuery('#bc-friends-chat-'+uid).prepend(html);
			} else {
				jQuery('#l-m-c').remove();
				jQuery('.chat-container').prepend(html);
			}
			jQuery('.last-online[data-last-online="'+uid+'"]').remove();
			// Reload the timeago plugin
			jQuery(".timeago").timeago('updateFromDOM');
		}
	});
}
function addSmile(value) {
	var id = jQuery('#chat-plugin-container').data('active-window');
	
	var currentInput = jQuery('#c-w-'+id).val();
	
	// Check whether the current input value can be retrieved or not (dedicated message page while chat window is inactive)
	if(typeof(currentInput) == "undefined") {
		var currentInput = jQuery('#chat').val();
	}
	
	// If the input is empty, don't add any new spaces before the smile
	if(currentInput == "") {
		var output = currentInput + value;
	} else {
		var output = currentInput + ' ' + value;
	}
	
	jQuery('#c-w-'+id).val(output);
	jQuery('.chat-user'+id).val(output);
}
function showEmojis(category) {
	jQuery('.emojis-list').hide();
	jQuery('#emojis-'+category).show();
	
	jQuery('.emoji-category').removeClass('emoji-category-active');
	jQuery('#emoji-button-'+category).addClass('emoji-category-active');
}
function chatPluginContainer(id, close, extra) {
	// Extra: Sets the style for the dedicated message page
	
	// Reset any previous styles (prevents adding extra styles over the dedicated message styles)
	jQuery(".chat-plugin-container").removeAttr("style");
	
	if(close) {
		jQuery('#chat-plugin-container').hide();
		return false;
	}
	// Get the position of the parent element
	if(extra) {
		var position = jQuery("#chat").position();
		var container = jQuery('.chat-plugin-container');
		
		// Store the position into an array
		var pos = {
			width: container.width(),
			height: container.height(),
			position: 'fixed',
			top: '50%',
			left: '0',
			bottom: '0',
			right: '0',
			margin: '-' + container.height() + 'px auto 0 auto'
		};
		
	} else {
		var position = jQuery("#c-w-"+id).position();
		var height = 112;
		if(lng_dir == "rtl") {
			var left = 8;
		} else {
			var left = 28;
		}
	
		// Store the position into an array
		var pos = {
			left: (position.left + left) + 'px'
		};
	}
	
	jQuery('#chat-plugin-container').show();
	jQuery('#chat-plugin-container').css(pos);
	jQuery('#chat-plugin-container').data('active-window', id);
}
function openChatWindow(id, username, realname, url, status) {
	var checkWindow = jQuery('#chat-window-'+id).html();
	if(!checkWindow) {
		// Get the html window model
		var window_html = jQuery('#chat-window-model').html();
		
		// Replace the JS variables with the variables
		var window_html = window_html.replace(/\'\+realname\+\'/g, realname).replace(/\'\+id\+\'/g, id).replace(/\'\+username\+\'/g, username).replace(/\'\+url\+\'/g, url).replace(/\'\+status\+\'/g, status).replace(/\<!--/g, '').replace(/\-->/g, '');
		
		jQuery('.bc-container').append(window_html);
		
		addFriendArray(id);
		
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/load_chat.php",
			data: "uid="+id+"&for=1&token_id="+token_id, 
			cache: false,
			success: function(html) {
				// Append the new comment to the div id
				jQuery('#bc-friends-chat-'+id).prepend(html);
				
				// Scroll to the bottom of the content
				jQuery("#bc-friends-chat-"+id).scrollTop(jQuery("#bc-friends-chat-"+id+".bc-friends-chat")[0].scrollHeight);
				
				// Reload the timeago plugin
				jQuery(".timeago").timeago('updateFromDOM');
			}
		});
	}
	jQuery('#c-w-'+id).focus();
}
function closeChatWindow(id) {
	jQuery('#chat-window-'+id).remove();
	
	// Get the array element and remove it
	var i = friends_windows.indexOf(id);
	if(i != -1) {
		// If the current ID being closed is not currently opened on the Messages Page
		if(window.location.search.indexOf('a=messages') == -1 && window.location.search.indexOf('id='+id) == -1 && window.location.href.indexOf(baseUrl+'/messages/') == -1 && window.location.href.indexOf('/'+id) == -1) {
			friends_windows.splice(i, 1);
		}
	}
}
function minimizeChatWindow(id, type) {
	if(jQuery('#chat-window-'+id).data('state') == 'minimized') {
		jQuery('#chat-window-'+id).removeAttr('style')
		jQuery('#chat-window-'+id).data('state', 'maximized');
		var state = 1;
	} else {
		jQuery('#chat-window-'+id).data('state', 'minimized');
		jQuery('#chat-window-'+id).css({'margin-top' : '315px'});
		var state = 0;
	}
	if(id == 'friends-list') {
		// Set the friends list state
		localStorage.setItem("friends-list-state", state);
	}
}
function disableTitleAlert(id) {
	jQuery('#chat-header-'+id).removeClass('bc-friends-header bc-friends-header-animated').addClass('bc-friends-header');
}
function addFriendArray(id) {
	// If the array key doesn't exist, then add it
	if(friends_windows.indexOf(id) == -1 && id > 0) {
		friends_windows.push(id);
	}
}
function cleanOldFid() {
	// If the user nagivates away from a page, check if the old fid from messages page has been cleaned up
	if(typeof old_fid != 'undefined') {
		// Check if the chat window is not opened
		if(jQuery('#bc-friends-chat-'+old_fid).length == 0) {
			var i = friends_windows.indexOf(old_fid);
			if(i != -1) {
				friends_windows.splice(i, 1);
			}
		}
	}
}
function startUpload() {
	document.getElementById("postForm").target = "frameForm";
	document.getElementById("postForm").submit();
	document.getElementById("post-loader9999999999").style.visibility = "visible";
	jQuery('#mentions-container').remove();
}
function stopUpload(success) {
	document.getElementById("post-loader9999999999").style.visibility = "hidden";
	jQuery('#load-content').after(success);
	// Get the last message ID
	var last = jQuery('.last-message').data("last");
	jQuery('#message'+last).hide().fadeIn('slow');

	if (success.indexOf('class="delete_btn"') == -1) {
		document.getElementById("postForm").reset();
		document.getElementById("post9999999999").style.height = "38px";
		jQuery('#queued-files').html('');

		// Reset the selected 'type' option
		jQuery('#values label').addClass('selected').siblings().removeClass('selected');
		jQuery('.message-form-input').hide('fast');
		jQuery('.selected-files').hide('fast');
		jQuery('#plugins-forms').hide('fast');
		jQuery(".timeago").timeago('updateFromDOM');
		autosize();
		// Hide the plugins forms
	}
	return true;   
}
function focus_form(id) {
	document.getElementById('comment-form'+id).focus();
	showButton(id);
}
function resizeGallery() {
	// image-container class
	var maxWidth = 1000;
	var maxHeight = 600;
	
	jQuery('.image-container').css('max-width', maxWidth);
	jQuery('.image-container').css('max-height', maxHeight);
	
	var currentWidth = jQuery(window).width();
	var currentHeight = jQuery(window).height();
	var currentMidWidth = Math.abs(currentWidth - maxWidth);
	var currentMidHeight = Math.abs(currentHeight - maxHeight);
	
	// Calculate the Width
	if(currentMidWidth <= 40 && currentMidWidth >= 0) {
		jQuery('.image-container').css('max-width', currentWidth - 40);
		jQuery('.image-container').css('margin-left', 20);
		jQuery('.image-container').css('margin-right', 20);
	} else if(maxWidth < currentWidth) {
		jQuery('.image-container').css('margin-left', ((currentWidth - maxWidth) / 2));
		jQuery('.image-container').css('margin-right', ((currentWidth - maxWidth) / 2));
	} else {
		jQuery('.image-container').css('max-width', currentWidth - 40);
	}
	
	// Calculate the Height
	if(currentMidHeight <= 40 && currentMidHeight >= 0) {
		jQuery('.image-container').css('max-height', currentHeight - (62 - 20));
		jQuery('.image-container').css('margin-top', 20);
		jQuery('.image-container').css('margin-bottom', 20);
		jQuery('.image-content').css('height', currentHeight - (40 + 62));
		jQuery('#gallery-next, #gallery-prev').css({'height': (jQuery('.image-content').height()-35), 'top': '35px'});
	} else if(maxHeight < currentHeight) {
		jQuery('.image-container').css('margin-top', ((currentHeight - maxHeight) / 2));
		jQuery('.image-container').css('margin-bottom', ((currentHeight - maxHeight) / 2));
		jQuery('.image-content').css('height', maxHeight - 62);
		jQuery('#gallery-next, #gallery-prev').css({'height': (jQuery('.image-content').height()-35), 'top': '35px'});
	} else {
		jQuery('.image-container').css('max-height', currentHeight - 40);
		jQuery('.image-content').css('height', currentHeight - (40 + 62));
		jQuery('#gallery-next, #gallery-prev').css({'height': (jQuery('.image-content').height()-35), 'top': '35px'});
	}
	
	// console.log('Image Width:'+jQuery('img.ri').width());
	// console.log('Image Height:'+jQuery('img.ri').height());
	// console.log('Container Width:'+jQuery('div.image-content').width());
	// console.log('Container Height:'+jQuery('div.image-content').height());
	return false;
	
	//jQuery('.image-container');
}
function manageResults(x) {
	if(x == 0) {
		hideSearch();
	} else {
		if(x == 1) {
			var url = search_users_url+jQuery("#search").val().replace(' ','+');
		} else if(x == 2) {
			var url = search_tags_url+jQuery("#search").val().replace('#','');
		} else if(x == 3) {
			var url = search_groups_url+jQuery("#search").val().replace('!','');
		} else if(x == 4) {
			var url = search_pages_url+jQuery("#search").val().replace('@','');
		}
		liveLoad(url);
	}
}
function chatLiveSearch(type) {
	// Type 1: Window Chat Search
	// Type 0: Messages page search
	
	if(type) {
		var q = jQuery('#search-window').val();
		var type = 1;
		var css = 'bc-friends-content';
		
		if(typeof last_window_search != 'undefined') {
			if(q == last_window_search) {
				return false;
			}
		}
		
		window.last_window_search = q;
	} else {
		var q = jQuery('#search-list').val();
		var type = 0;
		var css = 'sidebar-chat-list';
		
		if(typeof last_user_search != 'undefined') {
			if(q == last_user_search) {
				return false;
			}
		}

		window.last_user_search = q;
	}
	
	// If the request is empty	
	if(q.length == 0) {
		return false;
	}
	
	jQuery('.'+css).html('<div class="search-content"><div class="message-inner"><div class="preloader preloader-center"></div></div></div>');
	
	// If the text input is 0, remove everything instantly by setting the MS to 1
	var ms = 200;
	
	// Start the delay (to prevent some useless queries)
	setTimeout(function() {
		if(q == jQuery('#search-list').val() || q == jQuery('#search-window').val()) {
			$.ajax({
				type: "POST",
				url: baseUrl+"/requests/load_people.php",
				data: 'q='+q+'&start=1&live=1&list=1&type='+type+"&token_id="+token_id, // start is not used in this particular case, only needs to be set
				cache: false,
				success: function(html) {
					if(type) {
						jQuery('.bc-friends-content').html(html);
					} else {
						jQuery('.sidebar-chat-list').html(html);
					}
				}
			});
		}
	}, ms);
}
function profileCard(id, post, type, delay, page) {
	// ID: Unique user ID
	// Post: Unique Message/Post ID
	// Type: 0 - Message; 1 - Comment;
	// Delay: 0 - on mouse IN; 1 - on mouse OUT;
	if(delay == 1) {
		clearInterval(pcTimer);
	} else {
		window.pcTimer = setInterval(function(){

		if(type == 1) {
			var classType = 'comment';
			// The position to be increased
			var height = 45;
			var left = 0;
			var right = 20;
		} else {
			var classType = 'message';
			// The position to be increased
			var height = 58;
			var left = 20;
			var right = 20;
		}
		
		// Start displaying the profile card with the preloader
		jQuery('#profile-card').show();
		jQuery('#profile-card').html('<div class="profile-card-padding"><div class="preloader preloader-center"></div></div>');

		// Get the position of the parent element
		var position = jQuery("#"+classType+post).position();

		// Store the position into an array
		if(lng_dir == "rtl") {
			var pos = {
				top: (position.top + height) + 'px',
				right: right + 'px'
			};
		} else {
			var pos = {
				top: (position.top + height) + 'px',
				left: (position.left + left) + 'px'
			};
		}
		
		// Set the position of the profile card
		jQuery('#profile-card').css(pos);
		$.ajax({
			type: "POST",
			url: baseUrl+"/requests/load_profilecard.php",
			data: 'id='+id+"&page="+page+"&token_id="+token_id,
			cache: false,
			success: function(html) {			
				jQuery('#profile-card').html(html);
			},
			error: function() {
				jQuery('#profile-card').hide();
			}
		});
		clearInterval(pcTimer);
		}, 500);
	}
}
function notificationTitle(type) {
	// Type 1: Play the New Chat Message notification
	if(!document.hasFocus()) {
		if(type == 1) {
			jQuery('#soundNewChat')[0].play();
		} else if(type == 2) {
			jQuery("#soundNewNotification")[0].play();
		}
		
		// If the current document title doesn't have a count alert, add one
		var title = document.title;
		if(title.charAt(0) !== "(") {
			if(totalNotifications > 0) {
				document.title = "(" + totalNotifications + ") " + document.title;
			} else {
				document.title = "(!) " + document.title;
			}
		}
	}
}
function dropdownMenu(type) {
	// 1: Reset the menu
	if(type) {
		jQuery('.menu-image').removeClass('menu-image-active');
		jQuery('#menu-dd-container').hide();
	} else {
		// Dropdown Menu Icon
		jQuery('.menu-image').on("click", function() {
			jQuery('.menu-image').toggleClass('menu-image-active');
			jQuery('#menu-dd-container').toggle();
			showNotification('close', 1);
		});
	}
}
function messageMenu(id, type, close) {
	// Close 1: Close the context menu
	// Type 1: Open context for messages
	// Type 2: Open sidebar context for groups
	// Type 3: Open sidebar context for pages
	// Type 4: Open context for comments
	if(close == 1) {
		jQuery('.message-menu-container').removeClass('message-menu-active');
	} else {
		if(type == 1) {
			// If the menu is already opened and is being clicked, close it
			if(jQuery('#message-menu'+id).hasClass('message-menu-active')) {
				messageMenu(0, 0, 1);
			}
			// Display the menu
			else {
				jQuery('.message-menu-container').removeClass('message-menu-active');
				jQuery('#message-menu'+id).addClass('message-menu-container message-menu-active');
				jQuery('#message-menu'+id).show();
			}
		} else if(type == 2) {
			// If the menu is already opened and is being clicked, close it
			if(jQuery('#group-menu'+id).hasClass('message-menu-active')) {
				messageMenu(0, 0, 1);
			}
			// Display the menu
			else {
				jQuery('.message-menu-container').removeClass('message-menu-active');
				jQuery('#group-menu'+id).addClass('message-menu-container sidebar-menu-container message-menu-active');
				jQuery('#group-menu'+id).show();
			}
		} else if(type == 3) {
			// If the menu is already opened and is being clicked, close it
			if(jQuery('#page-menu'+id).hasClass('message-menu-active')) {
				messageMenu(0, 0, 1);
			}
			// Display the menu
			else {
				jQuery('.message-menu-container').removeClass('message-menu-active');
				jQuery('#page-menu'+id).addClass('message-menu-container sidebar-menu-container message-menu-active');
				jQuery('#page-menu'+id).show();
			}
		} else if(type == 4) {
			// If the menu is already opened and is being clicked, close it
			if(jQuery('#comment-menu'+id).hasClass('message-menu-active')) {
				messageMenu(0, 0, 1);
			}
			// Display the menu
			else {
				jQuery('.message-menu-container').removeClass('message-menu-active');
				jQuery('#comment-menu'+id).addClass('message-menu-container message-menu-active');
				jQuery('#comment-menu'+id).show();
			}
		}
	}
}
function postPrivacy(type) {
	// Set the input value
	jQuery('#message-privacy').val(type);
	
	// Set the privacy icon on the button
	jQuery('#privacy-btn').removeClass();
	if(type == 1) {
		jQuery('#privacy-btn').addClass('privacy-icons public-icon');
	} else if(type == 2) {
		jQuery('#privacy-btn').addClass('privacy-icons friends-icon');
	} else {
		jQuery('#privacy-btn').addClass('privacy-icons private-icon');
	}
}
function sidebarShow(id) {
	jQuery('#show-more-btn-'+id).remove();
	if(id == 1) {
		jQuery('.sidebar-events').fadeIn(300);
	} else if(id == 2) {
		jQuery('.sidebar-dates').fadeIn(300);
	} else if(id == 3) {
		jQuery('.sidebar-group').fadeIn(300);
	} else if(id == 4) {
		jQuery('.sidebar-page').fadeIn(300);
	}
}
function adminSubMenu(id) {
	jQuery('#sub-menu'+id).toggleClass('sidebar-link-sub-active');
	jQuery('#sub-menu-content'+id).slideToggle(300);
}
function checkAlert() {
	if(!document.hasFocus()) {
		// If the current document title doesn't have a count alert, add one
		var title = document.title;
		if(title.charAt(0) !== "(") {
			if(totalNotifications > 0) {
				document.title = "(" + totalNotifications + ") " + document.title;
			} else {
				document.title = "(!) " + document.title;
			}
		}
		notificationTitle(2);
	}
}
function searchFriends(url, type) {
	if(type == 1) {
		var q = jQuery('#search-group').val();
	} else if(type == 2) {
		var q = jQuery('#invite-page').val();
	} else {
		var q = jQuery('#invite-group').val();
	}
	if(q.length > 0) {
		liveLoad(url+q);
	}
}
jQuery(document).ready(function() {
	if(typeof friends_windows === 'undefined') {
		window.friends_windows = [];
	}
	dropdownMenu();
	
	// Prevent scrolling the page when scrolling a scrollable div
	jQuery(document).on('mousewheel DOMMouseScroll', '.scrollable', function(e) {
		var e0 = e.originalEvent,
			delta = e0.wheelDelta || -e0.detail;
		
		this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		e.preventDefault();
	});
	
	jQuery(document).on('change', '#avatarselect', function () {
		document.getElementById("avatar").submit();
	});
	
	jQuery(document).on('change', '#coverselect', function () {
		document.getElementById("cover").submit();
	});
	
	jQuery(document).on('click', '.chat-image-btn, .chat-camera-btn', function () {
		localStorage.setItem("chat-image-uid", jQuery(this).data("userid"));
	});
	
	jQuery(document).on('change', 'input[name="chatimage"]', function () {
		postChatImage();
	});
	
	jQuery(document).mouseup(function(e) {
		// All the divs that needs to be excepted when being clicked (including the buttons itselfs)
		var container = jQuery('.menu-image, .menu-dd-content, .search-content, .notification-content, .message-menu, .sidebar-settings, #privacy-button, #profile-button, #profile-extra, #share, #camera, #delete, #likes, #shares, #chat-plugin-container');

		// If the element clicked isn't the container nor a descendant then hide the menus, dropdowns
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			manageResults(0);
			dropdownMenu(1);
			messageMenu(0, 0, 1);
			showNotification('close', 1);
			hideModal();
			chatPluginContainer(0, 1);
		}
	});
	
	jQuery(document).on('keyup', '.message-form, .comment-reply-textarea', function(e) {
		jQuery('#mentions-container').remove();
		
		var target = jQuery(this);
		
		var textarea = target.val();

		var words = textarea.split(" ");
		
		var word = words[words.length-1];	
		
		var find = word.match(/(^|[^a-z0-9_\/])@([a-z0-9_]+)/i);
		
		try {
			if(find[2].length > 0) {
				$.ajax({
					type: "POST",
					url: baseUrl+"/requests/mentions.php",
					data: "&target="+target.attr('id')+"&value="+find[2]+"&token_id="+token_id,
					cache: false,
					success: function(html) {
						jQuery('#mentions-container').remove();
						if(target.hasClass('message-form')) {
							jQuery('.message-form-inner').after(html);
						} else {
							target.after(html);
							jQuery('#mentions-container').addClass('mentions-container');
						}
					}
				});
			}
		} catch(e) {
			
		}
	});
	
	jQuery("#search").on('keyup', function(e) {
		var q = jQuery('#search').val();
		
		if(typeof last_search != 'undefined') {
			if(q == last_search && e.which != 13) {
				return false;
			}
		}

		window.last_search = q;
		
		// If the query is empty, don't do anything
		if(q.length < 1) {
			hideSearch();
			return false;
		}
		
		// If the query starts with #, do not execute anything
		if(q == '#' || q == '!' || q == '@') {
			hideSearch();
			return false;
		}
		
		// Check the notification state
		if(typeof notificationState != 'undefined') {
			showNotification('close');
		}
		
		// Search
		if(q.substring(0, 1) == '#') {
			var url = 'load_tags';
			var full_url = search_tags_url+q.replace('#','');
			var data = 'q='+q+'&start=1&live=1';
		} else if(q.substring(0, 1) == '!') {
			var url = 'group';
			var full_url = search_groups_url+q.replace('!','');
			var data = 'type=4&value='+q+'&group=1&user=1';
		} else if(q.substring(0, 1) == '@') {
			var url = 'page';
			var full_url = search_pages_url+q.replace('@','');
			var data = 'live=1&value='+q;
		} else {
			var url = 'load_people';
			var full_url = search_users_url+q.replace(' ','+');
			var data = 'q='+q+'&start=1&live=1';
		}

		// If the text input is 0, remove everything instantly by setting the MS to 1
		if(q == 0) {
			var ms = 0;
		} else {
			jQuery('.search-container').show();
			jQuery('.search-container').html('<div class="search-content"><div class="search-results"><div class="retrieving-results"><div class="preloader preloader-left"></div></div></div></div>');
			var ms = 200;
		}
		
		if(e.which == 13) {
			liveLoad(full_url);
			hideSearch();
			return false;
		}
		
		// Start the delay (to prevent some useless queries)
		setTimeout(function() {
			if(q == jQuery('#search').val()) {
				if(q == 0) {
					hideSearch();
				} else {
					$.ajax({
						type: "POST",
						url: baseUrl+"/requests/"+url+".php",
						data: data+"&token_id="+token_id, // start is not used in this particular case, only needs to be set
						cache: false,
						success: function(html) {
							jQuery(".search-container").html(html).show();
						}
					});
				}
			}
		}, ms);
	});
	
	jQuery(document).on('keyup', '#search-list', function() { chatLiveSearch(0); });
	jQuery(document).on('keyup', '#search-window', function() { chatLiveSearch(1); });
	
	jQuery(document).on('click', '.notification-close-error, .notification-close-warning, .notification-close-success, .notification-close-info', function() {
		jQuery(this).parent().fadeOut("slow"); return false;
	});
	
	jQuery(window).resize(function() {
		resizeGallery()
	});
	resizeGallery();
		
	jQuery(document).on('click', '#gallery-close', function() {
		jQuery("#gallery, .overall").fadeOut(300);
		return false;
	});
	
	jQuery(document).on('click', '#values label:not(".plugin-button, #open_images")', function() {
		jQuery('#plugins-forms, #plugins-forms div, .message-form-input').hide('fast');
		jQuery(this).addClass('selected').siblings().removeClass('selected');
		jQuery('#form-value').attr("Placeholder", jQuery(this).attr('title'));
		jQuery('#form-value').val('');
		jQuery('#images').val('');
		jQuery('.message-form-input').show('fast', function() {
			// Select the form input
			jQuery('#form-value').focus();
		});
		jQuery('.selected-files').hide('fast');
	});
	
	jQuery(document).on('click', '#open_images', function() {
		jQuery('#plugins-forms, #plugins-forms div, .message-form-input').hide();
		jQuery('#form-value').val('');
		jQuery('#values label').removeClass('selected');
		jQuery('#images').click();
	});
	
	jQuery(document).on('change', '#images', function() {
		if(this.files.length > 0) {
			// Clear any previous selections
			jQuery('#queued-files').html('');
			jQuery('.selected-files').show();
			
			for(var i = 0; i < this.files.length; i++){
				if(this.files[i]) {
					var reader = new FileReader();
			
					reader.onload = function(e) {
						jQuery('#queued-files').append('<div class="si-box"><div class="si-box-inner" style="background-image: url('+e.target.result+');"></div></div>');
					}
					
					reader.readAsDataURL(this.files[i]);
				}
			}
		} else {
			// Clear any previous selections
			jQuery('#queued-files').html('');
			jQuery('.selected-files').hide();
		}
	});
	
	// Disable the enter key on messages
	jQuery(document).on('submit', '#postForm', function() {
		return false;
	});
	
	jQuery(document).on('click', '.comment-image-btn', function() {
		window.activeComment = jQuery(this).data("active-comment");
	});
	
	jQuery(document).on('change', 'input[name="commentimage"]', function() {
		if(this.files.length > 0) {
			// Clear any previous selections
			jQuery('#queued-comment-files'+activeComment).html('');
			
			for(var i = 0; i < this.files.length; i++){
				if(this.files[i]) {
					var reader = new FileReader();
			
					reader.onload = function(e) {
						jQuery('#queued-comment-files'+activeComment).append('<div class="sci-box"><div class="sci-box-inner" style="background-image: url('+e.target.result+');"></div></div>');
					}
					
					reader.readAsDataURL(this.files[i]);
				}
			}
		} else {
			// Clear any previous selections
			jQuery('#queued-comment-files'+activeComment).html('');
		}
		focus_form(activeComment);
	});
	
	autosize();
	
	jQuery('#profile-card').mouseleave(function() {
		jQuery('#profile-card').hide();
	});
	
	// When the window is focused
	jQuery(window).focus(function() {
		// Get the position numbe to cut from the title
		var cut = document.title.indexOf(')') + 1;
		
		// If the currentTitle has a notification notification, then remove it
		if(document.title.charAt(0) == "(") {
			document.title = document.title.substr(cut);
		}
	});
	
	// Enable infinite scrolling when on desktop
	if(/Mobi/.test(navigator.userAgent) == false) {
		jQuery(window).scroll(function() {
			if(jQuery(window).scrollTop() + jQuery(window).height() == jQuery(document).height()) {
				jQuery('#load-more').click();
			}
		});
	}
	
	// Set the friends list state
	if(localStorage.getItem('friends-list-state') == 0) {
		minimizeChatWindow('friends-list');
	}
	
	reload();
});
function reload() {
	jQuery(".timeago").timeago('updateFromDOM');
	autosize();
	// Reset menu, search
	manageResults(0);
	dropdownMenu(1);
	messageMenu(0, 0, 1);
	showNotification('close', 1);

	// Check the notification state
	if(typeof notificationState != 'undefined') {
		showNotification('close');
	}
	
	jQuery('#share, #camera, #delete, #likes, #shares').fadeOut();
	jQuery('.modal-background').fadeOut();

	// Reset the search value
	if(window.location.search.indexOf('a=search') == -1 && window.location.pathname.indexOf('/search/') == -1) {
		jQuery("#search").val('');
	}
	
	// Scroll down the chat window when on the messages page
	if(window.location.search.indexOf('a=messages') > -1 || window.location.pathname.indexOf('/messages/') > -1) {
		jQuery(".chat-container").scrollTop(jQuery(".chat-container")[0].scrollHeight);
	}
	
	// Reset the search value
	if(window.location.search.indexOf('a=search') == -1 && window.location.pathname.indexOf('/search/') == -1) {
		jQuery("#search").val('');
	}
	
	// Reload the profile card event
	jQuery('#profile-card').on("mouseleave", function() {
		jQuery('#profile-card').hide();
	});
	
	// On modal background click, hide it
	jQuery('.modal-background').on("click", function() {
		hideModal();
	});
	
	// Modal menu items
	jQuery('.modal-menu-item').click(function() {
		jQuery(this).addClass('modal-menu-item-active').siblings().removeClass('modal-menu-item-active');
		jQuery('.add-class-here').hide();
		jQuery('.'+jQuery(this).attr('id')).show();
	});
	
	// Edit menu items
	jQuery('.edit-menu-item').click(function() {
		jQuery(this).addClass('edit-menu-item-active').siblings().removeClass('edit-menu-item-active');
		jQuery('.edit-general,.edit-other,.edit-privacy,.edit-notifications,.edit-registration,.edit-limits,.edit-emails').hide();
		jQuery('.'+jQuery(this).attr('id')).show();
	});
	
	// If there's a comment #highlighted
	if(window.location.hash) {
		var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
		// If the hashtag is a comment 
		if(hash.indexOf("comment") > -1) {
			jQuery('#'+hash).addClass('comment-active');
		}
		// If the hashtag is a message 
		if(hash.indexOf("message") > -1) {
			jQuery('#'+hash+' .message-content').addClass('message-active');
		}
	}
}
function gallery(id, uid, type, target) {
	/**
	 * Target:	0 Pages, Profiles, Groups
	 *			1 Posts
	 *			2 Comments
	 *			3 Chats
	 */
	 
	if(target == 1) {
		var prefix = '-p-';
	} else if(target == 2) {
		var prefix = '-c-';
	} else if(target == 3) {
		var prefix = '-m-';
	} else {
		var prefix = '';
	}
	// Show the Gallery
	jQuery("#gallery, #gallery-background, .overall").fadeIn(300);
	
	// If the ID is close, close the Gallery
	if(id == 'close') {
		jQuery("#gallery, .overall").fadeOut(300);
		return false;
	}
	
	// Escape the ID (contains dots) http://api.jquery.com/category/selectors/
	var parsedId = id.replace('.', '\\.');
	
	// Decide NEXT / PREV buttons
	var nextImg = (jQuery('#'+parsedId).next('a'));
	var prevImg = (jQuery('#'+parsedId).prev('a'));

	// If the ID attribute is undefined, hide the button
	if(!nextImg.attr('id')) {
		jQuery('#gallery-next').hide();
	} else {
		jQuery('#gallery-next').show();
		jQuery('#gallery-next').attr('onclick', 'getNext(\''+id+'\', 0, '+uid+', '+target+')');
	}
	if(!prevImg.attr('id')) {
		jQuery('#gallery-prev').hide();
	} else {
		jQuery('#gallery-prev').show();
		jQuery('#gallery-prev').attr('onclick', 'getNext(\''+id+'\', 1, '+uid+', '+target+')');
	}
	
	// Put the content
	jQuery('.image-content').html('<img src="'+baseUrl+'/image.php?src='+id+'&t='+type.charAt(0)+'&zc=3" class="ri">').fadeIn(300);
	jQuery('.gallery-footer-container').html('<div class="message-avatar">'+(jQuery('#avatar'+prefix+uid).html() ? jQuery('#avatar'+prefix+uid).html() : '')+'</div><div class="message-top"><a onclick="gallery(\'close\')" title="'+lng_close+'"><div class="delete_btn"></div></a><a href="'+baseUrl+'/uploads/'+type+'/'+id+'" title="'+lng_download+'" target="_blank" download><div class="download_btn"></div></a><div class="message-author">'+(jQuery('#author'+prefix+uid).html() ? jQuery('#author'+prefix+uid).html() : '')+'</div><div class="message-time">'+(jQuery('#time'+prefix+uid).html() ? jQuery('#time'+prefix+uid).html() : '')+'</div></div>');
	jQuery('.timeago').timeago();
	
	resizeGallery();
}
function getNext(currentId, direction, uid, target) {
	if(target == 1) {
		var prefix = '-p-';
	} else if(target == 2) {
		var prefix = '-c-';
	} else if(target == 3) {
		var prefix = '-m-';
	} else {
		var prefix = '';
	}
	
	// Get the next id
	var parsedId = currentId.replace('.', '\\.');
	if(direction == 0) {
		var next = (jQuery('#'+parsedId).next('a'));
	} else {
		var next = (jQuery('#'+parsedId).prev('a'));
	}
	
	// Put the new Image
	jQuery(".image-content").html('<img src="'+baseUrl+'/image.php?src='+next.attr('id')+'&t=m&zc=3" class="ri">');
	jQuery('.gallery-footer-container').html('<div class="message-avatar">'+(jQuery('#avatar'+prefix+uid).html() ? jQuery('#avatar'+prefix+uid).html() : '')+'</div><div class="message-top"><a onclick="gallery(\'close\')" title="'+lng_close+'"><div class="delete_btn"></div></a><a href="'+baseUrl+'/uploads/media/'+next.attr('id')+'" title="'+lng_download+'" target="_blank" download><div class="download_btn"></div></a><div class="message-author">'+(jQuery('#author'+prefix+uid).html() ? jQuery('#author'+prefix+uid).html() : '')+'</div><div class="message-time">'+(jQuery('#time'+prefix+uid).html() ? jQuery('#time'+prefix+uid).html() : '')+'</div></div>');
	jQuery('.timeago').timeago();
	
	var currentId = next.attr('id').replace('.', '\\.');
	
	// Decide NEXT / PREV buttons
	var nextImg = (jQuery('#'+currentId).next('a'));
	var prevImg = (jQuery('#'+currentId).prev('a'));

	// If the ID attribute is undefined, hide the button
	if(!nextImg.attr('id')) {
		jQuery('#gallery-next').hide();
	} else {
		jQuery('#gallery-next').show();
		jQuery('#gallery-next').attr('onclick', 'getNext(\''+next.attr('id')+'\', 0, '+uid+', '+target+')');
	}
	if(!prevImg.attr('id')) {
		jQuery('#gallery-prev').hide();
	} else {
		jQuery('#gallery-prev').show();
		jQuery('#gallery-prev').attr('onclick', 'getNext(\''+next.attr('id')+'\', 1, '+uid+', '+target+')');
	}
	resizeGallery();
}
jQuery(function() {
	jQuery("body").on("click", "a[rel='loadpage']", function(e) {
		
		// Get the link location that was clicked
		liveLoad(jQuery(this).attr('href'), 0, null);
		
		return false;
	});
});

// Override the back button to get the ajax content via the back content */
jQuery(window).on('popstate', function(ev) {
	liveLoad(location.href, 0, null);
});

$.fn.scrollIntoView = function(padding, duration, easing) {	
    jQuery('html,body').animate({
        scrollTop: this.offset().top-padding
    }, duration, easing);
    return this;
};
function startLoadingBar() {
	// only add progress bar if added yet.
	jQuery("#loading-bar").show();
	jQuery("#loading-bar").width((50 + Math.random() * 30) + "%");
}
function stopLoadingBar() {
	//End loading animation
	jQuery("#loading-bar").width("101%").delay(200).fadeOut(400, function() {
		jQuery(this).width("0");
	});
}
function liveLoad(pageurl, type, parameters) {
	// page url = request url
	// type = 1: POST; 0: GET;
	// parameters: serialized params
	cleanOldFid();
	startLoadingBar();
	
	if(type == 1) {
		var type = "POST";
	} else {
		var type = "GET";
	}
	
	// Request the page
	$.ajax({url: pageurl, type: type, data: parameters, success: function(data) {
		var result = jQuery.parseJSON(data);
		// Show the content
		jQuery('#content').html(result.content);
		// Stop the loading bar
		stopLoadingBar();
		// Set the new title tag
		document.title = result.title;
		// Scroll the document at the top of the page
		jQuery(document).scrollTop(0);
		// Reload functions
		reload();
	}});
	
	// Store the url to the last page accessed
	if(pageurl != window.location) {
		window.history.pushState({path:pageurl}, '', pageurl);	
	}
	return false;
}
function doMention(id, find, replace) {
	window.current = jQuery('#'+id).val();
	jQuery('#'+id).val(current.replace(new RegExp('\@'+find+'\\b'), '@'+replace+' '));
	jQuery('#mentions-container').remove();
	jQuery('#'+id).focus();
}