<?php
/**
 * @version     0.8
 * @package     Minima
 * @subpackage  mod_myshortcuts
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

// defining the active icon
$juri = clone(JURI::getInstance());

$url = ($juri->getQuery()) ? $juri->getPath()."?".$juri->getQuery() : $url = $juri->getPath();

/*echo "<ul>";
echo "<li>".$button['link']."</li><br />";
echo "<li>".$url."</li><br />";
echo "</ul>";*/

?>

<li <?php if(strpos($url,$button['link']) !== false) echo "class=\"active\""; ?>>
    <a href="<?php echo $button['link']; ?>">
        <span><?php echo $button['text']; ?></span>
    </a>
</li>
