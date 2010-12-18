<?php

/**
 * @version		$Id: helper.php 18212 2010-07-22 06:02:54Z eddieajau $
 * @package		Joomla.Framework
 * @subpackage	Cache
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('JPATH_BASE') or die;

/**
 * Cache storage helper functions.
 *
 * @static
 * @package		Joomla.Framework
 * @subpackage	Cache
 * @since		1.6
 */
class JCacheStorageHelper
{
	/**
	 * @since	1.6
	 */
	public $group = '';

	/**
	 * @since	1.6
	 */
	public $size = 0;

	/**
	 * @since	1.6
	 */
	public $count = 0;

	/**
	 * Constructor
	 *
	 * @param	array	$options	options
	 */
	public function __construct($group)
	{
		$this->group = $group;
	}

	/**
	 * Increase cache items count.
	 *
	 * @param	string	$size	Cached item size
	 * @param	string	$group	The cache data group
	 * @since	1.6
	 */
	public function updateSize($size)
	{
		$this->size = number_format($this->size + $size, 2);
		$this->count++;
	}
}