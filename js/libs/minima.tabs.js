/** 
 * @package     Minima
 * @author      Henrik Hussfelt, Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

var MinimaTabsClass = new Class({
        
    Implements: [Options],

    options: {
    },

    elements: {
        'tabs': null,
        'content': null
    },
        
    // additional dom elements for processing
    domElements: {
        'subMenu': $('submenu'),
        'itemForm': $('item-form')
    },

    initialize: function(options, elements){

        // Set options
        this.setOptions(options);

        // Set elements
        this.elements = elements;

        // fix existing tabs        
        // if we have a #submenu in the DOM
        if (this.domElements.subMenu) {                
            // the #submenu should have a .minimaTabs class
            this.domElements.subMenu.addClass('minima-tabs');
            // and if we have tabs out of place..
            if(this.domElements.subMenu.hasClass('out') || this.domElements.itemForm) {                    
                // ..move them to the right place
                // which is above the title and toolbar-box
                this.domElements.subMenu.inject( $('content'),'top' );
            }
        } // end of if this.domElements.subMenu

    },

    showFirst: function() {
        // Show first
        this.elements.content.pick().removeClass('hide');
    },

    hideAllContent: function() {
        // Hide all
        this.elements.content.addClass('hide');
    },

    addTabsAction: function() {
        // save the context
        var _this = this;            
        // go through each tab and do the magic
        this.elements.tabs.each(function(tab, index){                
            tab.addEvents({
                click: function(e){                        
                    // Stop the event
                    e.stop();
                    // Remove class active from all tabs
                    _this.elements.tabs.removeClass('active');
                    // Add class to clicked element
                    _this.elements.tabs[index].addClass('active');
                    // Hide the content
                    _this.elements.content.addClass('hide');
                    // Add class to clicked elements content
                    _this.elements.content[index].removeClass('hide');
                }
            }); //end of tab.addEvents
        }); // end of tabs.each
    }
    
});