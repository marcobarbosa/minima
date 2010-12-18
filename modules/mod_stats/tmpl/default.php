<?php
/**
 * @version		$Id: default.php 17916 2010-06-28 09:31:16Z ian $
 * @package		Joomla.Site
 * @subpackage	mod_stats
 * @copyright	Copyright (C) 2005 - 2010 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;
?>
<dl class="stats-module<?php echo $params->get('moduleclass_sfx') ?>">
<?php foreach ($list as $item) : ?>
	<dt><?php echo $item->title;?></dt>
	<dd><?php echo $item->data;?></dd>
<?php endforeach; ?>
</dl>

