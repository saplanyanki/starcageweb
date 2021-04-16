<?php
error_reporting(0);
@ini_set('upload_max_size' , '256M' );
$CONF = $TMPL = array();

// The MySQL credentials
$CONF['host'] = 'localhost';
$CONF['user'] = 'u104610824_starcageyanki';
$CONF['pass'] = 'Boncuk11-';
$CONF['name'] = 'u104610824_starcage';

// The Installation URL
$CONF['url'] = 'http://starcage.online/';

// The Notifications e-mail
$CONF['email'] = 'yankisaplan@yahoo.com';

// The themes directory
$CONF['theme_path'] = 'themes';

// The plugins directory
$CONF['plugin_path'] = 'plugins';

$action = array('admin'			=> 'admin',
				'feed'			=> 'feed',
				'settings'		=> 'settings',
				'messages'		=> 'messages',
				'post'			=> 'post',
				'recover'		=> 'recover',
				'profile'		=> 'profile',
				'notifications'	=> 'notifications',
				'search'		=> 'search',
				'group'			=> 'group',
				'page'			=> 'page',
				'info'			=> 'info'
				);

define('COOKIE_PATH', preg_replace('|https?://[^/]+|i', '', $CONF['url']).'/');

?>