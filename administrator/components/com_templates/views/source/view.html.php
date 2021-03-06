<?php
/**
 * @version		$Id: view.html.php 20196 2011-01-09 02:40:25Z ian $
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

jimport('joomla.application.component.view');

/**
 * View to edit a template style.
 *
 * @package		Joomla.Administrator
 * @subpackage	com_templates
 * @since 1.6
 */
class TemplatesViewSource extends JView
{
	protected $form;
	protected $ftp;
	protected $source;
	protected $state;
	protected $template;

	/**
	 * Display the view
	 */
	public function display($tpl = null)
	{
		jimport('joomla.client.helper');

		// Initialise variables.
		$this->form		= $this->get('Form');
		$this->ftp		= JClientHelper::setCredentialsFromRequest('ftp');
		$this->source	= $this->get('Source');
		$this->state	= $this->get('State');
		$this->template	= $this->get('Template');

		// Check for errors.
		if (count($errors = $this->get('Errors'))) {
			JError::raiseError(500, implode("\n", $errors));
			return false;
		}

		$this->addToolbar();
		parent::display($tpl);
	}

	/**
	 * Add the page title and toolbar.
	 *
	 * @since	1.6
	 */
	protected function addToolbar()
	{
		JRequest::setVar('hidemainmenu', true);

		$user		= JFactory::getUser();
		$canDo		= TemplatesHelper::getActions();

		JToolBarHelper::title(JText::_('COM_TEMPLATES_MANAGER_EDIT_FILE'), 'thememanager');

		// Can save the item.
		if ($canDo->get('core.edit')) {
			JToolBarHelper::apply('source.apply','JTOOLBAR_APPLY');
			JToolBarHelper::save('source.save', 'JTOOLBAR_SAVE');
		}

		JToolBarHelper::cancel('source.cancel','JTOOLBAR_CANCEL');
		JToolBarHelper::divider();
		JToolBarHelper::help('JHELP_EXTENSIONS_TEMPLATE_MANAGER_TEMPLATES_EDIT_SOURCE');
	}
}
