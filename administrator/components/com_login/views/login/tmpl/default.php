<?php
/**
 * @version		$Id: default.php 17858 2010-06-23 17:54:28Z eddieajau $
 * @package		Joomla.Administrator
 * @subpackage	com_login
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

// Get the login modules
$modules = JModuleHelper::getModules('login');

foreach ($modules as $module)
// Render the login modules
	echo JModuleHelper::renderModule($module, array('style' => 'rounded', 'id' => 'section-box'));

