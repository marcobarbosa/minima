<?php
/**
 * @version     0.8
 * @package     Minima
 * @subpackage  mod_shortcuts
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// Check to ensure this file is included in Joomla!
defined('_JEXEC') or die;

require_once dirname(__FILE__).DS.'helper.php';

// set the params
ModMyShortcutsHelper::setParams($params);

require JModuleHelper::getLayoutPath('mod_myshortcuts');
