<?php
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;

require_once(__DIR__ .'/../../../includes/autoload.php');
require_once(__DIR__ .'/../vendor/autoload.php'); // Plugin library

if(isset($user['username'])) {
	$callInfo = $db->query(sprintf("SELECT * FROM `video_calls` WHERE `id` = '%s'", $db->real_escape_string($_GET['call_id'])));
	
	$call = $callInfo->fetch_assoc();
	
	// Get the call status
	if($call['status'] == 2 || $call['status'] == 3) {
		$call_is_ended = 1;
	} else {
		$call_is_ended = 0;
	}
	
	// Verify the call participants
	if($call['from'] != $user['idu'] && $call['to'] != $user['idu']) {
		// If the user is not part of the call
		header("Location: ".$CONF['url']);
	}
	
	// Extra stuff for the audio type call
    $cssbc = $cssbg = '';
	if($call['type'] == 0) {
		$cssbg = ' c-w-bg-audio';
		$cssbc = ' audio-buttons-container';
	} else {
		$cssbg = ' c-w-bg-video';
	}
	
	if($call['status'] == 2 || $call['status'] == 3) {
		$cssbg = ' c-w-bg-neutral';
	}
	
	// Select the user image
	$getUser = $db->query(sprintf("SELECT `username`, `first_name`, `last_name`, `image`, `cover` FROM `users` WHERE `idu` = '%s'", ($call['from'] == $user['idu'] ? $call['to'] : $call['from'])));
	
	$userInfo = $getUser->fetch_assoc();
} else {
	// If the user is not logged in
	header("Location: ".$CONF['url']);
}

$twilioAccountSid = $pluginsSettings['video_call_twilio_account_sid'];
$apiKeySid = $pluginsSettings['video_call_twilio_key_sid'];
$apiKeySecret = $pluginsSettings['video_call_twilio_key_secret'];

// Required for Video grant
$roomName = $_GET['call_id'];

// Participant name
$identity = $user['username'];

// Create access token, which we will serialize and send to the client
$token = new AccessToken($twilioAccountSid, $apiKeySid, $apiKeySecret, 3600, $identity);

// Create Video grant
$videoGrant = new VideoGrant();
$videoGrant->setRoom($roomName);

// Add grant to token
$token->addGrant($videoGrant);

mysqli_close($db);
?>
<!DOCTYPE html>
<html class="<?php echo $LNG['lang_dir']; ?>" dir="<?php echo $LNG['lang_dir']; ?>">
<head>
<meta charset="UTF-8" />
<title><?php echo $settings['title']; ?> Call - <?php echo realName($userInfo['username'], $userInfo['first_name'], $userInfo['last_name']); ?></title>
<link href="<?php echo $CONF['url']; ?>/<?php echo $CONF['theme_path']; ?>/<?php echo $settings['theme']; ?>/style.css" rel="stylesheet" type="text/css">
<script src="<?php echo $CONF['url']; ?>/<?php echo $CONF['theme_path']; ?>/<?php echo $settings['theme']; ?>/js/jquery.js"></script>
<script src="<?php echo $CONF['url']; ?>/<?php echo $CONF['plugin_path']; ?>/video_call/js/twilio.js"></script>
<!--<script src="//media.twiliocdn.com/sdk/js/video/v1/twilio-video.min.js"></script>-->
<link href="<?php echo $CONF['url']; ?>/<?php echo $CONF['plugin_path']; ?>/video_call/video_call.css" rel="stylesheet" type="text/css">
<script>
    'use strict';
    var Video = Twilio.Video;
    var token = '<?php echo $token->toJWT(); ?>';
    var call_id = '<?php echo htmlspecialchars($_GET['call_id'], ENT_QUOTES, 'UTF-8'); ?>';

    window.baseUrl = '<?php echo $CONF['url']; ?>';
    window.token_id = '<?php echo generateToken(); ?>';
    window.call_is_audio = <?php echo ($call['type'] ? 'false' : 'true'); ?>;
    window.call_is_ended = <?php echo $call_is_ended; ?>;
    window.call_started = false;

    if(!call_is_ended) {
        // Connect with audio-only
        Video.connect(token, {
            name: '<?php echo $roomName; ?>',
            audio: true,
            video: <?php echo ($call['type'] ? 'true' : 'false'); ?>
        }).then(function(room) {
            room.on('disconnected', function(room) {
                video_call_end();
            });

            window.remoteView = jQuery('#remote-container');
            window.localView = jQuery('#local-container');

            if(!call_is_audio) {
                localView.css('display', 'grid');
                jQuery('#camera-button').show();
            }

            room.on('participantConnected', function(participant) {
                if(call_is_audio) {
                    localView.hide();
                } else {
                    jQuery('#camera-button').show();
                }
                /*
                participant.on('trackDisabled', function(e) {
                });
                participant.on('trackRemoved', function(e) {
                });
                */
            });

            // Set the local video stream
            Video.createLocalVideoTrack().then(function(track) {
                if(!call_is_audio) {
                    localView[0].append(track.attach());
                }
            });

            // Add the remote video stream
            room.on('trackSubscribed', function(track) {
                remoteView[0].append(track.attach());
                if(typeof callCounter == "undefined") {
                    window.callCounter = setInterval(countTimer, 1000);
                    window.call_started = true;
                }
            });

            // Remove the remote video stream
            room.on('participantDisconnected', function(track) {
                // remoteStream.detach();

                video_call_end();
            });

            jQuery('#microphone-button').on('click', function() {
                if(jQuery('#microphone-button').attr('data-audio') == "true") {
                    jQuery('#microphone-button').attr("data-audio", "false");
                    jQuery('#microphone-button').addClass('video-call-button-microphone-muted');

                    room.localParticipant.tracks.forEach(function (track) {
                        if(track.kind == "audio") {
                            track.mediaStreamTrack.enabled = false;
                            track.mediaStreamTrack.muted = true;
                        }
                    });
                } else {
                    jQuery('#microphone-button').attr("data-audio", "true");
                    jQuery('#microphone-button').removeClass('video-call-button-microphone-muted');

                    room.localParticipant.tracks.forEach(function (track) {
                        if(track.kind == "audio") {
                            track.mediaStreamTrack.enabled = true;
                            track.mediaStreamTrack.muted = false;
                        }
                    });
                }
            });

            jQuery('#camera-button').on('click', function() {
                if(jQuery('#camera-button').attr('data-video') == "true") {
                    jQuery('#camera-button').attr('data-video', 'false');
                    jQuery('#camera-button').addClass('video-call-button-camera-off');

                    room.localParticipant.tracks.forEach(function (track) {
                        if(track.kind == "video") {
                            track.mediaStreamTrack.enabled = false;
                            track.mediaStreamTrack.muted = true;
                            jQuery('#local-container video').remove();
                        }
                    });
                } else {
                    jQuery('#camera-button').attr('data-video', 'true');
                    jQuery('#camera-button').removeClass('video-call-button-camera-off');

                    room.localParticipant.tracks.forEach(function (track) {
                        if(track.kind == "video") {
                            track.mediaStreamTrack.enabled = true;
                            track.mediaStreamTrack.muted = false;
                            localView[0].appendChild(track.attach());
                        }
                    });
                }
            });

            jQuery('#volume-button').on('click', function() {
                if(typeof jQuery('#remote-container audio')[0] != "undefined") {
                    var currentVolume = jQuery('#volume-button').attr('data-volume');

                    if(currentVolume == "1") {
                        jQuery('#volume-button').attr('data-volume', '0');
                        jQuery('#remote-container audio')[0].volume = 0;
                        jQuery('#volume-button').removeAttr('class').attr('class', 'video-call-button video-call-button-volume-mute');
                    } else if(currentVolume == "0") {
                        jQuery('#volume-button').attr('data-volume', '0.3');
                        jQuery('#remote-container audio')[0].volume = 0.3;
                        jQuery('#volume-button').removeAttr('class').attr('class', 'video-call-button video-call-button-volume-low');
                    } else if(currentVolume == "0.3") {
                        jQuery('#volume-button').attr('data-volume', '0.6');
                        jQuery('#remote-container audio')[0].volume = 0.6;
                        jQuery('#volume-button').removeAttr('class').attr('class', 'video-call-button video-call-button-volume-med');
                    } else if(currentVolume == "0.6") {
                        jQuery('#volume-button').attr('data-volume', '1');
                        jQuery('#remote-container audio')[0].volume = 1;
                        jQuery('#volume-button').removeAttr('class').attr('class', 'video-call-button video-call-button-volume-max');
                    }
                }
            });

            jQuery('#call-end').on('click', function() {
                room.disconnect();

                video_call_end();
            });
        }, function(error) {
            video_call_end(1);

            jQuery('#call-time').html('<span class="call-error"><strong>Error:</strong> '+error.name+'</span>')
        });
        /* Call Timer */
        window.callTime = 0;
        function countTimer() {
            ++callTime;
            var hour = pad(Math.floor(callTime /3600));
            var minute = pad(Math.floor((callTime - hour*3600)/60));
            var seconds = pad(callTime - (hour*3600 + minute*60));

            if(hour > 0) {
                jQuery("#call-time").html(hour+':'+minute+':'+seconds);
                window.callDuration = hour+':'+minute+':'+seconds;
            } else {
                jQuery("#call-time").html(minute+':'+seconds);
                window.callDuration = minute+':'+seconds;
            }
        }
        function pad(x) {
            return (x < 10) ? '0'+x.toString() : x.toString();
        }
    } else {
        jQuery(document).ready(function() {
            jQuery('#call-time').html('<?=$LNG['plugin_video_call_call_ended'];?>');

            // Remove the Call Buttons
            jQuery('#video-call-buttons').hide();
        });
    }
    jQuery(document).ready(function() {
        // jQuery(document).on("keydown", disableF5);

        // Autoclose conversation if the user does not respond in a defined time
        setTimeout(closeDial, <?php echo ($pluginsSettings['video_call_dial_time']*1000); ?>);

        // Autoclose conversation if the maximum call time exceeds
        setTimeout(closeCall, <?php echo ($pluginsSettings['video_call_call_time']*60*60*1000); ?>);
    });
    function closeDial() {
        if(call_started) {
            return false;
        } else {
            video_call_end();
        }
    }
    function closeCall() {
        video_call_end();
    }
    function disableF5(e) {
        if ((e.which || e.keyCode) == 116) {
            e.preventDefault();
        }
    }
    window.onbeforeunload = function() {
        video_call_end();
    }
    function video_call_end(x) {
        // Prevent multiple conversation closures
        if(typeof call_ended != "undefined") {
            return false;
        }
        window.call_ended = true;

        jQuery('#remote-container video, #remote-container audio, #local-container').remove();

        // Stop counting the call length
        if(typeof callCounter != "undefined") {
            clearInterval(callCounter);
        }

        // Replace the call time with the Call Ended text
        if(typeof callDuration != "undefined") {
            jQuery('#call-time').html('<?=$LNG['plugin_video_call_call_ended'];?> ('+callDuration+')');
        } else {
            jQuery('#call-time').html('<?=$LNG['plugin_video_call_call_ended'];?>');
        }

        // Remove the Call Buttons
        jQuery('#video-call-buttons').hide();

        jQuery('#remote-container').addClass('c-w-bg-neutral');

        $.ajax({
            type: "POST",
            url: baseUrl+"/plugins/video_call/requests/manage_call.php",
            data: "call_id="+call_id+"&type=2&token_id="+token_id,
            success: function(html) {
                if(!x) {
                    // Force refresh the browser to ensure all the connections are closed
                    setTimeout(window.location.reload.bind(window.location), 10000);
                }
            }
        });
    }
</script>
</head>
<body>
<div class="video-call-container<?php echo $cssbg; ?>">
	<div id="remote-container" class="<?php echo $cssbg; ?>">
		<div id="partner-container">
			<div id="partner-content">
				<div id="partner-image"><img src="<?php echo $CONF['url'].'/image.php?t=a&w=112&h=112&src='.$userInfo['image']; ?>"></div>
				<div id="partner-name"><?php echo realName($userInfo['username'], $userInfo['first_name'], $userInfo['last_name']); ?></div>
				<div id="call-time"><?=$LNG['plugin_video_call_calling'];?></div>
			</div>
		</div>
	</div>
	<div id="local-container"></div>
	<div class="video-call-buttons-container<?php echo $cssbc; ?>" id="video-call-buttons">
		<div class="video-call-button video-call-button-camera" id="camera-button" data-video="true"></div>
		<div class="video-call-button video-call-button-microphone" id="microphone-button" data-audio="true"></div>
		<div class="video-call-button video-call-button-volume-max" id="volume-button" data-volume="1"></div>
		<div class="video-call-button video-call-button-end" id="call-end"></div>
	</div>
</div>
</body>
</html>