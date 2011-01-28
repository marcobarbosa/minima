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

// template color parameter
$templateColor = $this->params->get('templateColor');
$darkerColor   = $this->params->get('darkerColor');

// just to avoid user error when # is missing
if (strrpos($templateColor, "#") === false) $templateColor = "#".$this->params->get('templateColor');

// get the current logged in user
$currentUser = JFactory::getUser();

?>

<!DOCTYPE html>
<html lang="<?php echo  $this->language; ?>" class="no-js" dir="<?php echo  $this->direction; ?>">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <jdoc:include type="head" />

    <link href="http://fonts.googleapis.com/css?family=Nobile&amp;subset=latin" rel="stylesheet" type="text/css">
    <link href="templates/<?php echo  $this->template ?>/css/template.css?v=1" rel="stylesheet">

    <!-- <link rel="stylesheet" media="handheld" href="css/handheld.css?v=1">  -->

    <style>
        #panel li a:hover,.box-top { background-color: <?php echo $templateColor; ?>; }
        #panel-tab, #panel-tab.active, #panel-wrapper,#more, #more.inactive { background-color: <?php echo $darkerColor; ?>; }
        #tophead, #prev, #next { background: <?php echo $templateColor;?>; background: -moz-linear-gradient(-90deg,<?php echo $templateColor;?>,<?php echo $darkerColor;?>); /* FF3.6 */ background: -webkit-gradient(linear, left top, left bottom, from(<?php echo $templateColor;?>), to(<?php echo $darkerColor;?>)); /* Saf4+, Chrome */ filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=<?php echo $templateColor;?>, endColorstr=<?php echo $darkerColor;?>); /* IE6,IE7 */ -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorStr='<?php echo $templateColor;?>', EndColorStr='<?php echo $darkerColor;?>')"; /* IE8 */ }
        #prev, #next { border: 1px solid <?php echo $templateColor; ?> }
        #prev:active, #next:active { background: <?php echo $darkerColor; ?>; }
        .box:hover { -moz-box-shadow: 0 0 10px <?php echo $templateColor; ?>; -webkit-box-shadow: 0 0 10px <?php echo $templateColor; ?>; box-shadow: 0 0 10px <?php echo $templateColor; ?>; }
        #panel-pagination li { color: <?php echo $templateColor; ?>; }
        ::selection { background: <?php echo $templateColor; ?>; color:#000; /* Safari */ }
        ::-moz-selection { background: <?php echo $templateColor; ?>; color:#000; /* Firefox */ }
        body, a:link { -webkit-tap-highlight-color: <?php echo $templateColor; ?>;  }
        #logo {text-shadow: 1px 1px 0 <?php echo $darkerColor; ?>, -1px -1px 0 <?php echo $darkerColor; ?>; }
    </style>

    <script src="templates/<?php echo $this->template ?>/js/head.min.js"></script>

</head>
<body id="minima" class="<?php if (JRequest::getInt('hidemainmenu')) echo " locked"; ?>">
    <?php if (!JRequest::getInt('hidemainmenu')): ?>
        <?php if( $this->countModules('panel') ): ?>
        <div id="panel-wrapper">
            <jdoc:include type="modules" name="panel" />
        </div>
        <?php endif; ?>
    <header id="tophead">
        <div class="title">
                <span id="logo"><?php echo $app->getCfg('sitename');?></span>
                <span class="site-link"><a target="_blank" title="<?php echo $app->getCfg('sitename');?>" href="<?php echo JURI::root();?>"><?php echo "(".JText::_('TPL_MINIMA_VIEW_SITE').")"; ?></a></span>
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
                    <dt><?php echo JText::_('TPL_MINIMA_TOOLS',true);?></dt>
                    <?php if( $currentUser->authorize( array('core.manage','com_checkin') ) ): ?><dd><a href="index.php?option=com_checkin"><?php echo JText::_('TPL_MINIMA_TOOLS_GLOBAL_CHECKIN'); ?></a></dd><?php endif; ?>
                    <?php if( $currentUser->authorize( array('core.manage','com_cache') ) ): ?><dd><a href="index.php?option=com_cache"><?php echo JText::_('TPL_MINIMA_TOOLS_CLEAR_CACHE'); ?></a></dd><?php endif; ?>
                    <?php if( $currentUser->authorize( array('core.manage','com_cache') ) ): ?><dd><a href="index.php?option=com_cache&amp;view=purge"><?php echo JText::_('TPL_MINIMA_TOOLS_PURGE_EXPIRED_CACHE'); ?></a></dd><?php endif; ?>
                    <?php if( $currentUser->authorize( array('core.manage','com_admin') ) ): ?><dd><a href="index.php?option=com_admin&amp;view=sysinfo"><?php echo JText::_('TPL_MINIMA_TOOLS_SYSTEM_INFORMATION'); ?></a></dd><?php endif; ?>
                </dl>
                <dl class="last">
                <dt><?php echo JText::_('TPL_MINIMA_EXTENSIONS',true);?></dt>
                    <?php if( $currentUser->authorize( array('core.manage','com_languages') ) ): ?><dd><a href="index.php?option=com_languages"><?php echo JText::_('TPL_MINIMA_TOOLS_LANGUAGES'); ?></a></dd><?php endif; ?>
                    <?php if( $currentUser->authorize( array('core.manage','com_modules') ) ): ?><dd><a href="index.php?option=com_modules"><?php echo JText::_('TPL_MINIMA_TOOLS_MODULES'); ?></a></dd><?php endif; ?>
                    <?php if( $currentUser->authorize( array('core.manage','com_plugins') ) ): ?><dd><a href="index.php?option=com_plugins"><?php echo JText::_('TPL_MINIMA_TOOLS_PLUGINS'); ?></a></dd><?php endif; ?>
                    <?php if( $currentUser->authorize( array('core.manage','com_templates') ) ): ?><dd><a href="index.php?option=com_templates"><?php echo JText::_('TPL_MINIMA_TOOLS_TEMPLATES'); ?></a></dd><?php endif; ?>
                </dl>
            </div><!-- /#list-content -->
        </div><!-- /#list-wrapper -->
    </header><!-- /#tophead -->
    <nav id="shortcuts">
            <jdoc:include type="modules" name="shortcuts" />
    </nav><!-- /#shortcuts -->
    <?php else: ?>
        <header id="tophead" class="locked">
            <div class="title">
                <span id="logo"><?php echo $app->getCfg('sitename');?></span>
            </div>
        </header>
    <?php endif; ?>
    <div class="message-wrapper"><jdoc:include type="message" /></div>
    <div id="content">
        <?php if (!JRequest::getInt('hidemainmenu')): ?>
            <jdoc:include type="modules" name="submenu" />
        <?php endif; ?>
        <div id="toolbar-box">
            <jdoc:include type="modules" name="toolbar" />
            <jdoc:include type="modules" name="title" />
        </div>
        <div id="content-box">
            <jdoc:include type="component" />
            <noscript><?php echo  JText::_('WARNJAVASCRIPT') ?></noscript>
        </div><!-- /#content-box -->
    </div><!-- /#content -->
    <footer>
        <p class="copyright">
            <a href="http://www.joomla.org">Joomla!</a>
            <span class="version"><?php echo  JText::_('JVERSION') ?> <?php echo  JVERSION; ?></span>
        </p>
        <jdoc:include type="modules" name="footer" style="none"  />
    </footer>
    <script>
        head.js(
            {minima: "templates/<?php echo $this->template ?>/js/minima.js?v=1"}
        );
        MooTools.lang.set('en-US', 'Minima', {
            actionBtn : "<?php echo JText::_('TPL_MINIMA_ACTIONS',true);?>",
            showFilter: "<?php echo JText::_('TPL_MINIMA_SEARCH',true);?>",
            closeFilter: "<?php echo JText::_('TPL_MINIMA_SEARCH',true);?>"
        });
    </script>
</body>
</html>
