<?php
/** 
 * @package     Minima
 * @subpackage  mod_mypanel
 * @author      Júlio Pontes
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// no direct access
defined('_JEXEC') or die;

/**
 * @package     Minima
 * @subpackage  mod_mypanel
 */
class ModMypanelHelper
{
    protected $_config;
    protected $_cache;

    /**
     * Constructor of helper
     */
    public function __construct( $config = array() )
    {
        // cache configuration
        $config['cache_request'] = isset($config['cache_request']) ? $config['cache_request'] : true ;
        $config['cache_time'] = isset($config['cache_time']) ? $config['cache_time'] : 30 ;
        // number of items displayed per page
        $config['pages'] = 9;
        
        // set the configuration
        $this->_config = $config;
        
        // instace cache
        jimport('joomla.cache.cache');
        $this->_cache = JCache::getInstance();
        // config cache
        $this->_cache->setCaching($config['cache_request']);
        $this->_cache->setLifeTime($config['cache_time']);
    }
    
    /**
     * Singleton instance of helper
     */
    public function getInstance()
    {
        static $instance;
        
        if (!isset( $instance )) {
            $instance = new ModMypanelHelper();
        }
        
        return $instance;
    }
    
    /**
     * Return number of pages
     */
    public function getNumPages()
    {
        return ceil( count($this->_data) / $this->_config['pages']);
    }
    
    /**
     * Return array items 
     */
    public function getItems()
    {
        // cache key
        $request_key = md5(__CLASS__);
        // cache folder
        $cache_group = 'mypanel';
        
        // get cached data
        $this->_data = $this->_cache->get($request_key,$cache_group);
        
        // check if cache data is empty
        if (empty($this->_data)) {
            // load extensions
            $this->_data = $this->_loadExtensions();
            // storing cache data
            $this->_cache->store($this->_data,$request_key,$cache_group);
        } else { echo 'dados da cache'; }

        return $this->_data;
    }
    
    public function _loadExtensions($authCheck = true)
    {
        // Initialise variables.
        $db     = JFactory::getDbo();
        $query  = $db->getQuery(true);
        $user   = JFactory::getUser();
        $lang   = JFactory::getLanguage();
        $langs  = array();
        $data   = array();
        
        // $query->select('e.extension_id, e.name, e.element');
        // $query->from('#__extensions AS e');
        
        // $query->where('e.enabled = 1');
        // $query->where('e.access <= '.$user->get('aid'));
        
        // $query->order('e.name');
        
        // Prepare the query.
        $query->select('m.id, m.title, m.alias, m.link, m.img, m.parent_id, m.client_id, e.element');
        $query->from('#__menu AS m');

        // Filter on the enabled states.
        $query->leftJoin('#__extensions AS e ON m.component_id = e.extension_id');

        $query->where('m.client_id = 1');
        $query->where('e.enabled = 1');
        $query->where('m.id > 1');

        // // Order by lft.
        $query->order('m.id DESC');

        $db->setQuery($query);

        $components = $db->loadObjectList();
        
        // loop through the results
        foreach($components as $component) {
            
            if ($component->parent_id == 1) {
                
                // Only add this top level if it is authorised and enabled.
                if ($authCheck == false || ($authCheck && $user->authorize('core.manage', $component->element))) {

                    // load language files for title and description
                    $lang->load($component->element, JPATH_BASE);
                    $lang->load($component->element, JPATH_ADMINISTRATOR);

                    // fix all the data for this root level entry
                    $component->link = trim($component->link);
                    $component->description = strip_tags( substr(JText::_(''.strtoupper($component->title).'_XML_DESCRIPTION'), 0, 100) );
                    $component->title = JText::_(''.strtoupper($component->title));

                    // get the description if it exists
                    // show the "no description available" message if not
                    if (strpos($component->description, '_XML_DESCRIPTION') !== false) {
                        $component->description = JText::_('TPL_MINIMA_NODESCRIPTION');
                    }

                    // get image if it exists 
                    // grab the css class for it if not
                    if (!$component->image = $this->getExtensionImage($component)) {
                        $component->cssClass = $this->getExtensionStyleClass($component);
                    }

                    // if the root menu link is empty, add it in
                    if (empty($component->link)) {
                        $component->link = 'index.php?option='.$component->element;
                    }

                    // all fixed 
                    // save the data to display
                    $data[$component->id] = $component;

                    if (!empty($component->element)) {
                        $langs[$component->element.'.sys'] = true;
                    }

                } //end if $authCheck
            }

        } // end foreach

        // load additional language files
        $this->_loadLanguages($langs);
        
        return $data;
    }
    
    /**
     * Return image from extension
     */
    public function getExtensionImage($row)
    {
        $img = '';
        
        if (is_null($img)) $this->setExtensionClass($row);

        return $img;
    }

    /**
     * Return the extension's CSS class
     */
    public function getExtensionStyleClass($row) 
    {

        // standard Joomla! components
        $_jComponents = array("com_banners", "com_contact", "com_messages", "com_newsfeeds", "com_redirect", "com_search", "com_weblinks");

        // if it's a standard extension, add the class to use the sprites
        if (in_array(strtolower($row->element), $_jComponents)) {
            
            // getting the component image class
            $arrClass = explode(":", $row->img);
            
            // concatenate with icon-48
            return "icon-48-".$arrClass[1];

        } else {

            return "icon-48-generic";
            
        }
        
    }
    
    public function getComponentXml($row)
    {
        $paths = array(
            JPATH_ADMINISTRATOR .DS. 'components' .DS. $row->element,
            JPATH_SITE .DS. 'components' .DS. $row->element
        );
        
        jimport('joomla.filesystem.path');
        $xmlFilesInDir = JPath::find($paths,$row->element.'.xml$');
        
        if ($xmlFilesInDir !== false) {
            $xmlFilesInDir = JApplicationHelper::parseXMLInstallFile($xmlFilesInDir);
        }
        
        return $xmlFilesInDir;
    }
    
    /**
     * Load aditional language files
     */
    public function _loadLanguages($langs)
    {
        // Initialise variables.
        $lang   = JFactory::getLanguage();
        
        // Load additional language files.
        foreach (array_keys($langs) as $langName) {            
            // Load the core file then
            // Load extension-local file.
                $lang->load($langName, JPATH_BASE, null, false, false)
            ||  $lang->load($langName, JPATH_ADMINISTRATOR.'/components/'.str_replace('.sys', '', $langName), null, false, false)
            ||  $lang->load($langName, JPATH_BASE, $lang->getDefault(), false, false)
            ||  $lang->load($langName, JPATH_ADMINISTRATOR.'/components/'.str_replace('.sys', '', $langName), $lang->getDefault(), false, false);
        }


    }
}