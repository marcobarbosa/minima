<?php
/**
 * @version     0.2
 * @package     Minima
 * @subpackage  mod_shortcuts
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
<li class="home"><a href="index.php">Dashboard</a></li>
<?php
foreach ($buttons as $button):
    echo ModMyshortcutsHelper::button($button);
endforeach;

if( ModMyshortcutsHelper::showLink() ):
?>
    <li class="last"><a href="index.php?option=com_modules&task=module.edit&id=69">Add shortcut</a></li>
<?php endif; ?>

</ul>

