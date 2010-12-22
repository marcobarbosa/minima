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

$app    = &JFactory::getApplication();

// Remove unnecessary inline javascript
$headerstuff = $this->getHeadData();
$headerstuff['script'] = array();
$this->setHeadData($headerstuff);

// template color parameter
$templateColor = $this->params->get('templateColor');
$darkerColor   = $this->params->get('darkerColor');
$lighterColor   = $this->params->get('lighterColor');

// Is it visiting for the first time?
//$welcome = $this->params->get('welcome_message',1);

// get the current logged in user
$currentUser = JFactory::getUser();

/*[1:37:32 PM AMT] ercan.ozkaya: $modules = JModuleHelper::getModules('cpanel'); will give you the modules.
[1:37:55 PM AMT] ercan.ozkaya: and then you should walk the array and call JModuleHelper::renderModule($module)
[1:38:57 PM AMT] ercan.ozkaya: or JModuleHelper::renderModule($module, $attribs)
*/

?>

<!DOCTYPE html>
<html lang="<?php echo  $this->language; ?>" class="no-js" dir="<?php echo  $this->direction; ?>" id="minwidth">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <jdoc:include type="head" />

    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Nobile&subset=latin">
    <link href="templates/<?php echo  $this->template ?>/css/template.css?v=1" rel="stylesheet" />

    <style>
        #panel li a:hover,.box-top { background-color: <?php echo $templateColor; ?>; }
        #panel-tab, #panel-tab.active, #panel-wrapper,#more, #more.inactive { background-color: <?php echo $darkerColor; ?>; }
        #header, #prev, #next { background: <?php echo $templateColor;?>; background: -moz-linear-gradient(-90deg,<?php echo $templateColor;?>,<?php echo $darkerColor;?>); /* FF3.6 */ background: -webkit-gradient(linear, left top, left bottom, from(<?php echo $templateColor;?>), to(<?php echo $darkerColor;?>)); /* Saf4+, Chrome */ filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=<?php echo $templateColor;?>, endColorstr=<?php echo $darkerColor;?>); /* IE6,IE7 */ -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='<?php echo $templateColor;?>', EndColorStr='<?php echo $darkerColor;?>')"; /* IE8 */ }
        #prev, #next { border: 1px solid <?php echo $templateColor; ?> }
        #prev:active, #next:active { background: <?php echo $darkerColor; ?>; }
        .box:hover { -moz-box-shadow: 0 0 10px <?php echo $templateColor; ?>; -webkit-box-shadow: 0 0 10px <?php echo $templateColor; ?>; box-shadow: 0 0 10px <?php echo $templateColor; ?>; }
        #panel-pagination li { color: <?php echo $templateColor; ?>; }
        ::selection { background: <?php echo $templateColor; ?>; color:#000; /* Safari */ }
        ::-moz-selection { background: <?php echo $templateColor; ?>; color:#000; /* Firefox */ }
        body { -webkit-tap-highlight-color: <?php echo $templateColor; ?>;  }
    </style>

    <script src="templates/<?php echo $this->template ?>/js/raphael.min.js" charset="utf-8"></script>
    <!--<script src="templates/<?php echo $this->template ?>/js/minima.js?v=1"></script>-->

    <script src="templates/<?php echo $this->template ?>/js/head.min.js"></script>
    <script>
        head.js(
            //{raphael: "templates/minima/js/raphael.min.js?v=1"},
            {minima: "templates/<?php echo $this->template ?>/js/minima.js?v=1"}
        );
    </script>

</head>
<body id="minwidth-body" class="full jbg cpanel<?php if (JRequest::getInt('hidemainmenu')) echo " hiddenmenu"; ?>">
<?php if( $this->countModules('panel') ): ?>
    <div id="panel-wrapper">
            <jdoc:include type="modules" name="panel" />
    </div>
    <?php endif; ?>
    <div id="header">
            <div class="title">
                <span id="logo"><?php echo $app->getCfg('sitename');?></span>
                <span class="site-link"><a href="<?php echo JURI::root();?>" target="_blank"><?php echo "(".JText::_('TPL_MINIMA_VIEW_SITE').")"; ?></a></span>
            </div>
            <div id="module-status">
                <jdoc:include type="modules" name="status"  />
            </div>
            <?php if( $this->countModules('panel') ): ?>
            <div id="tab-wrapper">
                <span id="panel-tab"<?php if (JRequest::getInt('hidemainmenu')) echo " class=\"disabled\""; ?>>
                    <?php echo JText::_('TPL_MINIMA_PANEL') ?>
                </span>
            </div>
            <?php endif; ?>
            <div id="list-wrapper">
                <span id="more"<?php if (JRequest::getInt('hidemainmenu')) echo " class=\"disabled\""; ?>></span>
                <div class="clr"></div>
                <div id="list-content">
                    <dl class="first">
                        <dt>Tools</dt>
                        <?php if( $currentUser->authorize( array('core.manage','com_checkin') ) ): ?><dd><a href="index.php?option=com_checkin"><?php echo JText::_('TPL_MINIMA_TOOLS_GLOBAL_CHECKIN'); ?></a></dd><?php endif; ?>
                        <?php if( $currentUser->authorize( array('core.manage','com_cache') ) ): ?><dd><a href="index.php?option=com_cache"><?php echo JText::_('TPL_MINIMA_TOOLS_CLEAR_CACHE'); ?></a></dd><?php endif; ?>
                        <?php if( $currentUser->authorize( array('core.manage','com_cache') ) ): ?><dd><a href="index.php?option=com_cache&amp;view=purge"><?php echo JText::_('TPL_MINIMA_TOOLS_PURGE_EXPIRED_CACHE'); ?></a></dd><?php endif; ?>
                        <?php if( $currentUser->authorize( array('core.manage','com_admin') ) ): ?><dd><a href="index.php?option=com_admin&amp;view=sysinfo"><?php echo JText::_('TPL_MINIMA_TOOLS_SYSTEM_INFORMATION'); ?></a></dd><?php endif; ?>
                    </dl>
                    <dl class="last">
                    <dt>Extensions</dt>
                        <?php if( $currentUser->authorize( array('core.manage','com_languages') ) ): ?><dd><a href="index.php?option=com_languages"><?php echo JText::_('TPL_MINIMA_TOOLS_LANGUAGES'); ?></a></dd><?php endif; ?>
                        <?php if( $currentUser->authorize( array('core.manage','com_modules') ) ): ?><dd><a href="index.php?option=com_modules"><?php echo JText::_('TPL_MINIMA_TOOLS_MODULES'); ?></a></dd><?php endif; ?>
                        <?php if( $currentUser->authorize( array('core.manage','com_plugins') ) ): ?><dd><a href="index.php?option=com_plugins"><?php echo JText::_('TPL_MINIMA_TOOLS_PLUGINS'); ?></a></dd><?php endif; ?>
                        <?php if( $currentUser->authorize( array('core.manage','com_templates') ) ): ?><dd><a href="index.php?option=com_templates"><?php echo JText::_('TPL_MINIMA_TOOLS_TEMPLATES'); ?></a></dd><?php endif; ?>
                    </dl>
                </div><!-- /#list-content -->
            </div><!-- /#list-wrapper -->
    </div><!-- /#header -->
    <div id="shortcuts">
            <jdoc:include type="modules" name="shortcuts" />
    </div>

    <div id="content-cpanel">
        <jdoc:include type="message" />

        <noscript>
                <?php echo  JText::_('WARNJAVASCRIPT') ?>
        </noscript>
        <div id="widgets-first" class="col">
            <jdoc:include type="modules" name="widgets-first" style="widget" />
        </div><!-- /#widgets-first -->
        <div id="widgets-last" class="col">
            <jdoc:include type="modules" name="widgets-last" style="widget" />
        </div><!-- /#widgets-last -->
    <p class="copyright">
        <a href="http://www.joomla.org">Joomla!</a>
        <span class="version"><?php echo  JText::_('JVERSION') ?> <?php echo  JVERSION; ?></span>
    </p>
    <jdoc:include type="modules" name="footer" style="none"  />
    </div><!-- /#content-cpanel -->
</body>
</html>
