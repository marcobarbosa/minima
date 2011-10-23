    <?php
/** 
 * @package     Minima
 * @subpackage  mod_myshortcuts
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// import JFile
//jimport( 'joomla.filesystem.file' );

class Mod_MyshortcutsInstallerScript {

    function postflight($type, $parent) {

        $db = JFactory::getDBO();
        
        $db->setQuery("SELECT `home` FROM `#__template_styles` WHERE `#__template_styles`.`template` = 'minima'");

        $alreadyInstalled = $db->loadResult();

        // language that is being used
        $currentLang = JFactory::getLanguage()->getTag();

        if (!$alreadyInstalled) {

            // myshortcuts
            $db->setQuery("UPDATE `#__modules`".
                " SET `position` = 'shortcuts', `published` = '1', `access` = '3'".
                " WHERE `#__modules`.`module` = 'mod_myshortcuts'; ");

            if (!$db->query() && ($db->getErrorNum() != 1060)) {
                echo $db->getErrorMsg(true);
            }

            // mypanel
            $db->setQuery("UPDATE `#__modules`".
                " SET `position` = 'panel', `published` = '1', `access` = '3'".
                " WHERE `#__modules`.`module` = 'mod_mypanel'; ");

            if (!$db->query() && ($db->getErrorNum() != 1060)) {
                echo $db->getErrorMsg(true);
            }

            // add values to modules_menu
            $db->setQuery("INSERT INTO `#__modules_menu` (`moduleid`,`menuid`)".
                " SELECT `id`,0 FROM `#__modules`".
                " WHERE `#__modules`.`module` = 'mod_myshortcuts' OR `#__modules`.`module` = 'mod_mypanel' LIMIT 2");

            if (!$db->query() && ($db->getErrorNum() != 1060)) {
                echo $db->getErrorMsg(true);
            }

            // set minima style default
            $db->setQuery("UPDATE `#__template_styles`".
                " SET `home` = '0'".
                " WHERE `#__template_styles`.`client_id` =1;");

            if (!$db->query() && ($db->getErrorNum() != 1060)) {
                die($db->getErrorMsg(true));
            }

            $db->setQuery("UPDATE `#__template_styles`".
                " SET `home` = '1' WHERE `#__template_styles`.`template` = 'minima';");

            if (!$db->query() && ($db->getErrorNum() != 1060)) {
                die($db->getErrorMsg(true));
            }

        // end of alreadyInstalled
        } else {
            
            // check for widgets-first and widgets-last modules
            $db->setQuery("SELECT `position` FROM `#__modules` WHERE `#__modules`.`position` LIKE 'widgets'");
            
            // as of beta 4 they should be cpanel instead
            $hasWrongPositions = $db->loadResult();

            // minima doesn't need dashboard positions anymore
            if ($hasWrongPositions) {
                // update position to cpanel
                $db->setQuery("UPDATE `#__modules`".
                    " SET `position` = 'cpanel'".
                    " WHERE `#__modules`.`position` = 'widgets-first' OR `#__modules`.`position` = 'widgets-last' ;");

                if (!$db->query() && ($db->getErrorNum() != 1060)) {
                    die($db->getErrorMsg(true));
                }
            }


            // cleaning cache
            //JModel::cleanCache("Minima");

        }
    } // end of postflight

}