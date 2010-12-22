<?php
/**
 * @version     0.8
 * @package     Minima
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

$strItems = "";

if (count($list)) :
    foreach ($list as $i=>$item) :
        $strItems .= "['".$item->title."',".$item->hits."],";
    endforeach;

    // just to trim the last comma
    $strItems = substr($strItems, 0, -1);

endif;

?>
    <?php if(!empty($strItems)): ?>

        <script type="text/javascript" src="http://www.google.com/jsapi?autoload=%7B%22modules%22%3A%5B%7B%22name%22%3A%22visualization%22%2C%22version%22%3A%221%22%2C%22packages%22%3A%5B%22piechart%22%5D%7D%5D%7D"></script>
        <script type="text/javascript">

              // Set a callback to run when the Google Visualization API is loaded.
              google.setOnLoadCallback(drawChart);

              // Callback that creates and populates a data table,
              // instantiates the pie chart, passes in the data and
              // draws it.
              function drawChart() {

              // Create our data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', <?php echo "'".JText::_('MOD_POPULAR')."'"; ?>);
                data.addColumn('number', <?php echo "'".JText::_('MOD_POPULAR_FIELD_COUNT_LABEL')."'"; ?>);
                data.addRows([
                  <?php echo $strItems; ?>
                ]);
                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.PieChart(document.getElementById('holder'));
                chart.draw(data, {width: 400, height: 240, is3D: true, title: <?php echo "'".JText::_('MOD_POPULAR_ITEMS')."'"; ?>});
              }

        </script>

        <div id="holder"></div>

    <?php else: ?>

        <div id="holder"><?php echo JText::_('MOD_POPULAR_NO_MATCHING_RESULTS');?></div>

    <?php endif; ?>
