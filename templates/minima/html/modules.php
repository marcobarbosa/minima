<?php
/** 
 * @package     Minima
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

/*
 * Module chrome for rendering the box in the dashboard
 */
function modChrome_widget($module, &$params, &$attribs)
{
    if ($module->content)
    {
        ?>
        <div id="<?php echo $module->id ?>" class="box">
            <div class="box-top">
                <span><?php echo $module->title; ?></span>
            </div>
            <div class="box-content"><?php echo $module->content; ?></div>
        </div>
        <?php
    }
}
?>
