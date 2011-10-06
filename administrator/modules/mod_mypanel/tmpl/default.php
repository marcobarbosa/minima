<?php
/**
 * @package     Minima
 * @subpackage  mod_mypanel
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

$items = $helper->getItems();
$invisible = false;

$nPages = $helper->getNumPages();

// hide arrows if items lower or equal 9
//if (count($items) <= 9) $invisible = true;
?>
<div id="panel">
    <!-- search field -->
    <!--<input type="text" id="search-term" placeholder="What are you looking for?" />-->
    <?php if (!$invisible) : ?>
    <!-- dots pagination -->
    <ul id="panel-pagination">
        <?php $pageCount=0; ?>
        <?php for($i=0; $i < $nPages; $i++) : ?>
            <li <?php if($i == 0) echo "class=\"current\"" ?> id="panel-pagination-<?php echo $pageCount;?>">.</li>
        <?php
            $pageCount+=1;
        endfor;
        ?>
    </ul>
    <?php endif; ?>
    <!-- prev button -->
    <a href="#" id="prev" <?php if ($invisible) echo "class=\"invisible\""; ?>><span class="arrow"></span></a>
    <ul id="panel-list">
        <?php
            $class = ""; $count = 0;
           foreach ($items as $item) :
        ?>
        <?php   if (empty($item->image)): ?>
                <li>
                    <a href="<?php echo $item->link; ?>" class="<?php echo $item->cssClass; ?>"><?php echo $item->name; ?>
                        <span class="extension-desc"><?php echo $item->description; ?></span>
                    </a>
                </li>
        <?php else: ?>
                <li class="ext">
                    <img src="<?php echo $item->image; ?>" width="48" height="48" alt="<?php echo $item->name; ?>" />
                    <a href="<?php echo $item->link; ?>" class="<?php echo $item->cssClass; ?>"><?php echo $item->name; ?>
                        <span class="extension-desc"><?php echo $item->description; ?></span>
                    </a>
                </li>
        <?php endif; ?>
    <?php endforeach; ?>
    </ul>
    <!-- next button -->
    <a href="#" id="next" <?php if ($invisible) echo "class=\"invisible\""; ?>><span class="arrow"></span></a>
</div>

<div class="clr"></div>