<?php
/**
 * @version		$Id: default.php 21020 2011-03-27 06:52:01Z infograf768 $
 * @package		Joomla.Administrator
 * @subpackage	mod_latest
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;
?>
<table class="adminlist">
	<thead>
		<tr>
			<th>
				<?php echo JText::_('MOD_LATEST_LATEST_ITEMS'); ?>
			</th>
			<th>
				<strong><?php echo JText::_('JSTATUS'); ?></strong>
			</th>
			<th>
				<strong><?php echo JText::_('MOD_LATEST_CREATED'); ?></strong>
			</th>
			<th>
				<strong><?php echo JText::_('MOD_LATEST_CREATED_BY');?></strong>
			</th>
		</tr>
	</thead>
<?php if (count($list)) : ?>
	<tbody>
	<?php foreach ($list as $i=>$item) : ?>
		<tr>
			<td>
				<?php if ($item->checked_out) : ?>
						<?php echo JHtml::_('jgrid.checkedout', $i, $item->editor, $item->checked_out_time); ?>
				<?php endif; ?>

				<?php if ($item->link) :?>
					<a href="<?php echo $item->link; ?>">
						<?php echo htmlspecialchars($item->title, ENT_QUOTES, 'UTF-8');?></a>
				<?php else :
					echo htmlspecialchars($item->title, ENT_QUOTES, 'UTF-8');
				endif; ?>
			</td>
			<td class="center">
				<?php echo JHtml::_('jgrid.published', $item->state, $i, '', false); ?>
			</td>
			<td class="center">
				<?php echo JHtml::_('date',$item->created, 'Y-m-d H:i:s'); ?>
			</td>
			<td class="center">
				<?php echo $item->author_name;?>
			</td>
		</tr>
		<?php endforeach; ?>
	</tbody>
<?php else : ?>
	<tbody>
		<tr>
			<td colspan="3">
				<p class="noresults"><?php echo JText::_('MOD_LATEST_NO_MATCHING_RESULTS');?></p>
			</td>
		</tr>
	</tbody>
<?php endif; ?>
</table>
