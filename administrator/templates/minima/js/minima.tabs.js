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

	initialize: function(options, elements){
    	// Set options
    	this.setOptions(options);

    	// Set elements
    	this.elements = elements;
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
    	this.elements.tabs.each(function(tab, index){
            tab.addEvents({
                click: function(e){
                	// Stop the event
                    e.stop();
                    // Remove class active from all tabs
                    this.elements.tabs.removeClass('active');
                    // Add class to clicked element
                    this.elements.tabs[index].addClass('active');
                    // Hide the content
                    this.elements.content.addClass('hide');
                    // Add class to clicked elements content
                    this.elements.content[index].removeClass('hide');
                }.bind(this)
            }); //end of tab.addEvents
        }.bind(this)); // end of tabs.each
    }
});