<?php
error_reporting(0);

$CONF = $TMPL = array();

// The MySQL credentials
$CONF['host'] = 'localhost';
$CONF['user'] = 'u268357242_test';
$CONF['pass'] = 'Boncuk11-';
$CONF['name'] = 'u268357242_test';

// The Installation URL
$CONF['url'] = 'http://yankisaplan.com/';

// The Notifications e-mail
$CONF['email'] = 'email@email.com';

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