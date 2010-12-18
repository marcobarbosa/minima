<?php
/**
 * @version		$Id: contact.php 15976 2010-04-10 04:44:23Z hackwar $
 * @package		Joomla.Site
 * @subpackage	Contact
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

jimport('joomla.application.component.controller');
require_once JPATH_COMPONENT.'/helpers/route.php';

$controller = JController::getInstance('Contact');
$controller->execute(JRequest::getCmd('task'));
$controller->redirect();
