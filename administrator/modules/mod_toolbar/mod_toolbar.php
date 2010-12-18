<?php
/**
 * @version		$Id: mod_toolbar.php 14276 2010-01-18 14:20:28Z louis $
 * @package		Joomla.Administrator
 * @subpackage	mod_toolbar
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

// Import dependancies.
jimport('joomla.html.toolbar');

// Get the toolbar.
$toolbar = JToolBar::getInstance('toolbar')->render('toolbar');

require JModuleHelper::getLayoutPath('mod_toolbar', $params->get('layout', 'default'));