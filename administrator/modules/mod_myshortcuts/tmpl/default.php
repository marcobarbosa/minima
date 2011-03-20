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

// get the current logged in user
$currentUser = JFactory::getUser();

?>

<ul>
	<li class="home">
		<a href="index.php">Dashboard</a>
	</li>
	<?php if( $currentUser->authorize( array('core.manage','com_config') ) ): ?>
	<li>
		<a href="<?php echo JRoute::_('index.php?option=com_config'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_CONFIGURATION');?>
		</a>		
	</li>
	<?php endif; ?>
	<?php 
		if( $currentUser->authorize( array('core.manage','com_content') )
			|| $currentUser->authorize( array('core.manage','com_categories') ) 
			|| $currentUser->authorize( array('core.manage','com_media') )
		) : 
	?>
	<li class="parent">
		<a href="#">Content</a>
		<nav class="sub">			
			<?php if( $currentUser->authorize( array('core.manage','com_content') ) ): ?>
			<ul>				
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_content#content-box'); ?>">Articles</a>
				</li>			
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_content&task=article.add'); ?>">Add New Article</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_content&view=featured#content-box'); ?>">Featured Articles</a>
				</li>
			</ul>
			<?php endif; ?>
			<?php if( $currentUser->authorize( array('core.manage','com_categories') ) ): ?>
			<ul>
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_categories&view=categories&extension=com_content#content-box'); ?>">Categories</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_categories&view=category&layout=edit&extension=com_content'); ?>">Add New Category</a>
				</li>
			</ul>
			<?php endif; ?>
			<?php if( $currentUser->authorize( array('core.manage','com_media') ) ): ?>
			<ul class="row">
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_media#content-box');?>">Media</a>
				</li>				
			</ul>
			<?php endif; ?>
		</nav><!-- /.sub -->
	</li><!-- /.parent -->
	<?php endif; ?>
	<?php if( $currentUser->authorize( array('core.manage','com_menus') ) ): ?>
	<li class="parent">
		<a href="#">Menus</a>
		<nav class="sub">			
			<ul>
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_menus&view=menus#content-box'); ?>">All Menus</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_menus&view=menu&layout=edit'); ?>">Add New Menu</a>
				</li>
			</ul>			
		</nav><!-- /.sub -->
	</li><!-- /.parent -->
	<?php endif; ?>
	<?php if( $currentUser->authorize( array('core.manage','com_users') ) ): ?>
	<li class="parent">
		<a href="#">Users</a>	
		<nav class="sub">			
			<ul>
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_users&view=users#content-box'); ?>">All Users</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_users&task=user.add'); ?>">Add New User</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_users&view=mail'); ?>">Mass Email Users</a>
				</li>
				</ul>			
			<ul>
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_users&view=groups#content-box'); ?>">Groups</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_users&task=group.add'); ?>">Add New Group</a>
				</li>
				</ul>			
			<ul class="row">
				<li>
					<a class="section" href="<?php echo JRoute::_('index.php?option=com_users&view=levels#content-box'); ?>">Access Levels</a>
				</li>
				<li>
					<a href="<?php echo JRoute::_('index.php?option=com_users&task=level.add'); ?>">Add New Access Level</a>
				</li>
			</ul>
		</nav><!-- /.sub -->
	</li><!-- /.parent -->
	<?php endif; ?>
	<?php 
		if( $currentUser->authorize( array('core.manage','com_languages') ) 
			|| $currentUser->authorize( array('core.manage','com_modules') )
			|| $currentUser->authorize( array('core.manage','com_plugins') )
			|| $currentUser->authorize( array('core.manage','com_templates') )
		): 
	?>
	<li class="parent">			
		<a href="#">Extensions</a>
		<nav class="sub">			
			<ul>
				<?php if( $currentUser->authorize( array('core.manage','com_languages') ) ): ?>
				<li><a href="<?php echo JRoute::_('index.php?option=com_languages#content-box'); ?>">Languages</a></li>
				<?php endif; ?>
				<?php if( $currentUser->authorize( array('core.manage','com_modules') ) ): ?>
				<li><a href="<?php echo JRoute::_('index.php?option=com_modules#content-box'); ?>">Modules</a></li>
				<?php endif; ?>
				<?php if( $currentUser->authorize( array('core.manage','com_plugins') ) ): ?>
				<li><a href="<?php echo JRoute::_('index.php?option=com_plugins#content-box'); ?>">Plugins</a></li>
				<?php endif; ?>
				<?php if( $currentUser->authorize( array('core.manage','com_templates') ) ): ?>
				<li><a href="<?php echo JRoute::_('index.php?option=com_templates#content-box'); ?>">Templates</a></li>
				<?php endif; ?>
			</ul>
		</nav><!-- /.sub -->
	</li><!-- /.parent -->
	<?php endif; ?>
	<li class="last">
		<a href="<?php echo JRoute::_('index.php?option=com_admin&view=help'); ?>">
			<?php echo JText::_('MOD_MYSHORTCUTS_HELP'); ?>
		</a>
	</li>
</ul>

