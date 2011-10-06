<?php
/** 
 * @package     Minima
 * @subpackage  mod_mypanel
 * @author      Marco Barbosa e Júlio Pontes
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

    public function __construct( $config = array() )
    {
        $config['cache_request'] = isset($config['cache_request']) ? $config['cache_request'] : false ;
        $config['cache_time'] = isset($config['cache_time']) ? $config['cache_time'] : 30 ;
        $config['pages'] = 9;
        
        $this->_config = $config;
        
        jimport('joomla.cache.cache');
        $this->_cache = JCache::getInstance();
        $this->_cache->setCaching($config['cache_request']);
        $this->_cache->setLifeTime($config['cache_time']);
    }
    
    public function getInstance()
    {
        static $instance;
        
        if (!isset( $instance )) {
            $instance = new ModMypanelHelper();
        }
        
        return $instance;
    }
    
    public function getNumPages()
    {
        return ceil( count($this->_data) / $this->_config['pages']);
    }
    
    public function getItems()
    {
        $request_key = md5(__CLASS__);
        $cache_group = 'mypanel';
        
        $this->_data = $this->_cache->get($request_key,$cache_group);
        
        if (empty($this->_data)) {
            $this->_data = $this->_loadExtensions();
            $this->_cache->store($this->_data,$request_key,$cache_group);
        }
        
        return $this->_data;
    }
    
    public function _loadExtensions()
    {
        // Initialise variables.
        $db = JFactory::getDbo();
        $query  = $db->getQuery(true);
        $user   = JFactory::getUser();
        
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

        $query->where('m.client_id=1');
        $query->where('e.enabled = 1');
        $query->where('m.id > 1');

        // // Order by lft.
        $query->order('m.id DESC');

        $db->setQuery($query);
        $rows = $db->loadObjectList();
        
        $data = array();
        
        foreach($rows as $row)
        {
            $this->loadLanguages($row);
            $xml = $this->getComponentXml($row);
            
            $description = JText::_(strtoupper($row->element).'_XML_DESCRIPTION');
            
            //component object
            $component = new stdclass;
            $component->name = ($xml) ? $xml->name : $row->title ;
            //$component->name = JText::_(''.strtoupper($row->title));
            $component->description = (strpos($description,'_XML_DESCRIPTION') >= 0) ? JText::_('TPL_MINIMA_NODESCRIPTION') : JString::substr($description,0,100) ;
            
            if (!$component->image = $this->getExtensionImage($row)) {

                $component->cssClass = $this->getExtensionClass($row);
                
            }
            $component->link = 'index.php?option='.$row->element;
            
            array_push($data, $component);
        }
        
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
     * Return the extension's class
     */
    public function getExtensionClass($row) 
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
     * Load custom language file
     */
    public function loadLanguages($row)
    {
        // Initialise variables.
        $lang   = JFactory::getLanguage();
        
        $lang->load($row->element, JPATH_BASE);
        $lang->load($row->element, JPATH_ADMINISTRATOR);
    }
}