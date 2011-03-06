<?php
/** 
 * @package     Minima
 * @subpackage  mod_myshortcuts
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

$buttons = ModMyshortcutsHelper::getButtons();

// make a select id from modules where 'module' = 'mod_shortcuts'
?>

<ul>
	<li class="home">
		<a href="index.php">Dashboard</a>
	</li>
	<li>
		<a href="<?php echo JRoute::_('index.php?option=com_config'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_CONFIGURATION');?>
		</a>
	</li>
	<li class="parent">
		<a href="<?php echo JRoute::_('index.php?option=com_content'); ?>">
			Content
		</a>
		<nav class="sub">			
			<ul>
				<li>
					<a class="section" href="#">Articles</a>
				</li>
				<li>
					<a>Add New Article</a>
				</li>
				<li>
					<a>Featured Articles</a>
				</li>
			</ul>
			<ul>
				<li>
					<a class="section">Categories</a>
				</li>
				<li>
					<a>Add New Category</a>
				</li>
			</ul>
			<ul class="row">
				<li>
					<a class="section">Media</a>
				</li>				
			</ul>
		</nav><!-- end of inner -->
	</li>
	<!--<li>
		<a href="<?php echo JRoute::_('index.php?option=com_content&task=article.add'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_ADD_ARTICLE'); ?>
		</a>
	</li>
	<li>
		<a href="<?php echo JRoute::_('index.php?option=com_media');?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_MEDIA'); ?>
		</a>
	</li>-->
	<li>
		<a href="<?php echo JRoute::_('index.php?option=com_menus&view=menus#content-box'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_MENUS'); ?>
		</a>
	</li>
	<li>
		<a href="<?php JRoute::_('index.php?option=com_users'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_USERS'); ?>
		</a>		
	</li>
	<li>			
		<a href="#">Extensions</a>
		<!--<ul>
			<li><a>Languages</a></li>
			<li><a>Modules</a></li>
			<li><a>Plugins</a></li>
			<li><a>Templates</a></li>
		</ul>-->
	</li>
	<li class="last">
		<a href="<?php echo JRoute::_('index.php?option=com_admin&view=help'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_HELP'); ?>
		</a>
	</li>

</ul>

