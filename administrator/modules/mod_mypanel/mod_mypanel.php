<?php
/**
 * @version     0.2
 * @package     Minima
 * @subpackage  mod_panel
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

// Include the module helper class.
require_once dirname(__FILE__).DS.'helper.php';

// Initialise variables.
$lang       = &JFactory::getLanguage();
$user       = &JFactory::getUser();
$enabled    = JRequest::getInt('hidemainmenu') ? false : true;

// Render the module layout
require JModuleHelper::getLayoutPath('mod_mypanel');
