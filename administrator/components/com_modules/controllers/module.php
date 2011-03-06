<?php
/**
 * @version		$Id: module.php 20228 2011-01-10 00:52:54Z eddieajau $
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

jimport('joomla.application.component.controllerform');

/**
 * Module controller class.
 *
 * @package		Joomla.Administrator
 * @subpackage	com_modules
 * @version		1.6
 */
class ModulesControllerModule extends JControllerForm
{
	/**
	 * Override the execute method to clear the modules cache for non-display tasks.
	 *
	 * @param	string		The task to perform.
	 * @return	mixed|false	The value returned by the called method, false in error case.
	 * @since	1.6
	 */
	public function execute($task)
	{
		parent::execute($task);

		// Clear the component's cache
		if ($task != 'edit' && $task != 'cancel' && $task != 'add') {
			$cache = JFactory::getCache('com_modules');
			$cache->clean();
		}
	}
	
	public function saveAjax()
	{
		$data		= JRequest::getVar('jform', array(), 'post', 'array');
		$model		= $this->getModel();
		
		$form = $model->getForm($data, false);

		if (!$form) {
			echo 'false';
			JFactory::getApplication()->close();
		}
		
		// Test if the data is valid.
		$validData = $model->validate($form, $data);

		// Check for validation errors.
		if ($validData === false) {
			echo 'false';
			JFactory::getApplication()->close();
		}
		$table = JTable::getInstance('module');
		$table->bind($validData);
		echo $table->store();
		JFactory::getApplication()->close();
	}

	/**
	 * Override parent add method.
	 */
	public function add()
	{
		// Initialise variables.
		$app = JFactory::getApplication();

		// Get the result of the parent method. If an error, just return it.
		$result = parent::add();
		if (JError::isError($result)) {
			return $result;
		}

		// Look for the Extension ID.
		$extensionId = JRequest::getInt('eid');
		if (empty($extensionId)) {
			$this->setRedirect(JRoute::_('index.php?option='.$this->option.'&view='.$this->view_item.'&layout=edit', false));
			return JError::raiseWarning(500, 'COM_MODULES_ERROR_INVALID_EXTENSION');
		}

		$app->setUserState('com_modules.add.module.extension_id', $extensionId);
	}

	/**
	 * Override parent cancel method to reset the add module state.
	 */
	public function cancel($key = null)
	{
		// Initialise variables.
		$app = JFactory::getApplication();

		parent::cancel();

		$app->setUserState('com_modules.add.module.extension_id', null);
	}

	/**
	 * Override parent allowSave method.
	 */
	protected function allowSave($data, $key = 'id')
	{
		// use custom position if selected
		if (empty($data['position'])) {
			$data['position'] = $data['custom_position'];
		}

		unset($data['custom_position']);

		return parent::allowSave($data, $key);
	}

	/**
	 * Function that allows child controller access to model data after the data has been saved.
	 *
	 * @param	JModel	$model	The data model object.
	 *
	 * @return	void
	 * @since	1.6
	 */
	protected function postSaveHook(JModel &$model, $validData = array())
	{
		// Initialise variables.
		$app = JFactory::getApplication();
		$task = $this->getTask();

		switch ($task)
		{
			case 'save2new':
				$app->setUserState('com_modules.add.module.extension_id', $model->getState('module.extension_id'));
				break;

			default:
				$app->setUserState('com_modules.add.module.extension_id', null);
				break;
		}
	}
}
