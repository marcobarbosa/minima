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

// template color parameter
$templateColor = $this->params->get('templateColor');
$darkerColor   = $this->params->get('darkerColor');

// just to avoid user error when # is missing
if (strrpos($templateColor, "#") === false) $templateColor = "#".$this->params->get('templateColor');

$app = &JFactory::getApplication();

?>
<!DOCTYPE html>

<!--[if lt IE 7 ]> <html lang="<?php echo  $this->language; ?>" class="no-js ie6" dir="<?php echo  $this->direction; ?>" id="minwidth"> <![endif]-->
<!--[if IE 7 ]>    <html lang="<?php echo  $this->language; ?>" class="no-js ie7" dir="<?php echo  $this->direction; ?>" id="minwidth"> <![endif]-->
<!--[if IE 8 ]>    <html lang="<?php echo  $this->language; ?>" class="no-js ie8" dir="<?php echo  $this->direction; ?>" id="minwidth"> <![endif]-->
<!--[if IE 9 ]>    <html lang="<?php echo  $this->language; ?>" class="no-js ie9" dir="<?php echo  $this->direction; ?>" id="minwidth"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="<?php echo  $this->language; ?>" class="no-js" dir="<?php echo  $this->direction; ?>" id="minwidth"> <!--<![endif]-->
<head>

    <meta charset="utf-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <jdoc:include type="head" />

    <link href="templates/<?php echo $this->template ?>/css/template.css?v=1" rel="stylesheet" type="text/css" />

    <style type="text/css">
            body { background: <?php echo $templateColor;?> url("../<?php echo $this->params->get('templateLogo','logo_minima.png'); ?>") 95% 95% no-repeat; }
            #login-box { border: 15px solid <?php echo $darkerColor; ?>}

    </style>

    <script type="text/javascript">
    function setFocus() {
        document.getElementById('form-login').username.select();
        document.getElementById('form-login').username.focus();
    }
    </script>

</head>
<body onload="javascript:setFocus()" id="front">
    <div id="login-container">
        <div id="message-wrapper"><jdoc:include type="message" /></div>
        <div id="login-box">
                    <jdoc:include type="component" />
                <noscript>
                    <?php echo  JText::_('WARNJAVASCRIPT') ?>
                </noscript>
        </div><!-- /#login-box -->
    </div>
</body>
</html>
