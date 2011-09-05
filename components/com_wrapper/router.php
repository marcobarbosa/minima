<?php
/**
 * @version		$Id: router.php 20196 2011-01-09 02:40:25Z ian $
 * @package		Joomla.Site
 * @subpackage	com_wrapper
 * @copyright	Copyright (C) 2005 - 2011 Open Source Matters, Inc. All rights reserved.
 * @license		GNU General Public License version 2 or later; see LICENSE.txt
 */

/**
 * @param	array
 * @return	array
 */
function WrapperBuildRoute(&$query)
{
	$segments = array();

	if (isset($query['view'])) {
		unset($query['view']);
	}

	return $segments;
}

/**
 * @param	array
 * @return	array
 */
function WrapperParseRoute($segments)
{
	$vars = array();

	$vars['view'] = 'wrapper';

	return $vars;
}