<?php
/**
 * @version		$Id: plugin.php 17858 2010-06-23 17:54:28Z eddieajau $
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

jimport('joomla.application.component.controllerform');

/**
 * Plugin controller class.
 *
 * @package		Joomla.Administrator
 * @subpackage	com_plugins
 * @since		1.6
 */
class PluginsControllerPlugin extends JControllerForm
{
	/**
	 * Override the execute method to clear the plugin cache for non-display tasks.
	 *
	 * @param	string		The task to perform.
	 * @return	mixed|false	The value returned by the called method, false in error case.
	 * @since	1.6
	 */
	public function execute($task)
	{
		parent::execute($task);

		// Clear the component's cache
		if ($task != 'display') {
			$cache = JFactory::getCache('com_plugins');
			$cache->clean();
		}
	}
}