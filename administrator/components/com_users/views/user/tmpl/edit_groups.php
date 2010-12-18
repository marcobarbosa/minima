<?php
/**
 * @version		$Id: edit_groups.php 19662 2010-11-28 02:30:10Z dextercowley $
 * @package		Joomla.Administrator
 * @subpackage	com_users
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

// Include the component HTML helpers.
JHtml::addIncludePath(JPATH_COMPONENT.'/helpers/html');
?>
<?php echo JHtml::_('access.usergroups', 'jform[groups]', array_keys($this->groups)); ?>
