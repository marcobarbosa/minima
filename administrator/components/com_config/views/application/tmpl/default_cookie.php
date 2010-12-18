<?php
/**
 * @version		$Id: default_cookie.php 19594 2010-11-20 05:06:08Z ian $
 * @package		Joomla.Administrator
 * @subpackage	com_config
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access
defined('_JEXEC') or die;
?>

<div class="width-100">

<fieldset class="adminform">
	<legend><?php echo JText::_('COM_CONFIG_COOKIE_SETTINGS'); ?></legend>
	<ul class="adminformlist">
			<?php
			foreach ($this->form->getFieldset('cookie') as $field):
			?>
					<li><?php echo $field->label; ?>
					<?php echo $field->input; ?></li>

			<?php
			endforeach;
			?>
		</ul>
</fieldset>
</div>