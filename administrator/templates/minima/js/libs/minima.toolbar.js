window.addEvent('domready', function() {
   
   // TOOLBAR
   // ==================================================
   var
        toolbarElements = $$('.toolbar-list li a'),
        toolbar = $('toolbar'),
        bulkActions = new Array(),
        bulkNonActions = new Array(),
        language = MooTools.lang.get('Minima');
        
    if( toolbarElements.length )
    {
        toolbarElements.each(function(item1){
            // whatever has a 'if' clause in the onclick value is a bulk action
            if( item1.get('onclick') != null && item1.get('onclick').contains('if') )
            {
                 bulkActions.push(item1.getParent('li'));
            }
            else if( item1.get('class') != "divider" )
            {
                bulkNonActions.push(item1.getParent('li'));
            }
        });
    }

    // ------------------------------- 
    // create elements
    if(bulkActions.length > 1)
    {
        // create the new <ul>
        var bulkListChildren = new Element('ul', {'id' : 'actions'}).hide(); // actions <ul>

        // sort the list alphabetically
        bulkActions = bulkActions.sort(function (a, b) {
            if ( a.get("text").toLowerCase() < b.get("text").toLowerCase() ) return -1;
            if ( a.get("text").toLowerCase() == b.get("text").toLowerCase() ) return 0;
            return 1;
        });

        // then add the list items
        bulkActions.each(function(item2, index){
            bulkListChildren.grab(item2);
        });

        // create parent <li> that will toggle the new <ul>
        var bulkListParent   = new Element('li', {
            'id': 'bulkActions',
            'events': {
                'click': function(event){
                    //bulkListChildren.toggle();
                    this.toggleReveal(bulkListChildren,{duration: 200, styles: ['border']});
                    $$(minima.getElement('#bulkActions > a:first-child'), this).switchClass('active', 'inactive');                                        
                },
                'outerClick': function(){
                    //bulkListChildren.hide();
                    bulkListChildren.dissolve({duration: 250});
                    minima.getElement('#bulkActions > a:first-child').set('class','inactive');
                }
            }
        });

        // and add the anchor to this parent <li>
        var bulkListAnchor   = new Element('a', {'html': language['actionBtn']}); // parent anchor
        var spanArrow        = new Element('span', {'class' : 'arrow'}); // arrow

        // ------------------------------- 
        // now fix the elements

        // first add the new parent li
        // check if there's a toolbar-new button, the #actions goes right after it
        var liLocation = ( $('toolbar-new') ) ? 'ul > li#toolbar-new' : 'ul > li';
        bulkListParent.inject($('toolbar').getElement(liLocation), 'after');

        // add the new anchor
        $('bulkActions').grab(bulkListAnchor);

        // add the arrow
        bulkListAnchor.grab(spanArrow);

        // then add the ul children of it
        $('bulkActions').grab(bulkListChildren);

        // everything's ready, now show it back

    } // end bulkActions.lenght

});

/*

/** 
 * @package     Minima
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

var MinimaToolbarClass = new Class({
	// implements
	Implements: [Options],

	// class options
    options: {
    	'toolbar' : $('toolbar'), // toolbar parent
    	'toolbarElements' : $$('.toolbar-list li a'), // list of the anchor elements
    	'label' : null
    },

    // local class elements
    elements: {    	    	
    	'bulkActionsArray': [], // array with the actions
    	'bulkNonActionsArray': [], // array with the other elements    	
    },
	
	// local instances
	minima : null,

    // initialize the class
	initialize: function(options, elements){
    	// set the main node for DOM selection
    	this.minima = document.id(options.minima) || document.id('minima');

    	// Set options
    	this.setOptions(options);

    	// Set elements
    	this.elements = elements;

    },

    // sort the items between actions and non actions
    sortItems: function() {
		if (this.options.toolbarElements.length) {
        	this.options.toolbarElements.each(function(item){
	            // whatever has a 'if' clause in the onclick value is a bulk action
	            if (item.get('onclick') != null && item.get('onclick').contains('if')) {
	                 this.elements.bulkActionsArray.push(item.getParent('li'));
	            } else if (item.get('class') != "divider") {
	                this.elements.bulkNonActionsArray.push(item.getParent('li'));
	            }
	        });
    	}    	
    }, // end of sortItems

    // fix the toolbar
    fixToolbar: function() {
    	// only proccess if we have bulkActionsArray
    	if (this.elements.bulkActionsArray.length > 1) {
    		
    		// creating new elements	        
	        var 
	        	// actions <ul>
	        	bulkListChildren = new Element('ul#actions').hide(), 
	        	// create parent <li> that will toggle the new <ul>
	        	bulkListParent   = new Element('li', { 
		            'id': 'bulkActions',
		            'events': {
		                'click': function(event){
		                    //bulkListChildren.toggle();
		                    this.toggleReveal(bulkListChildren,{duration: 200, styles: ['border']});
		                    $$(this.minima.getElement('#bulkActions > a:first-child'), this).switchClass('active', 'inactive');                                        
		                },
		                'outerClick': function(){
		                    //bulkListChildren.hide();
		                    bulkListChildren.dissolve({duration: 250});
		                    this.minima.getElement('#bulkActions > a:first-child').set('class','inactive');
		                }
		            }
	        	}),
	        	// parent <a>                
	        	bulkListAnchor = new Element('a[text= '+ this.options.label +']'),
	        	// arrow <span>
	        	spanArrow = new Element('span.arrow');                

	        // sort the list alphabetically
	        this.elements.bulkActionsArray = this.elements.bulkActionsArray.sort(function (a, b) {
	            if ( a.get("text").toLowerCase() < b.get("text").toLowerCase() ) return -1;
	            if ( a.get("text").toLowerCase() == b.get("text").toLowerCase() ) return 0;
	            return 1;
	        });

	        // then add the list items
	        this.elements.bulkActionsArray.each(function(item, index){
	        	// grab the action item into the list
	            bulkListChildren.grab(item);
	        });

	        // add the new parent li
	        // check if there's a toolbar-new button, the #actions goes right after that
	        var liLocation = ( $('toolbar-new') ) ? 'ul > li#toolbar-new' : 'ul > li';
	        bulkListParent.inject($('toolbar').getElement(liLocation), 'after');
            // TODO make it the second elements always

            // TODO must cache bulkActions somehow - test with code above
	        // add the new anchor
	        $('bulkActions').grab(this.elements.bulkListAnchor);

	        // add the arrow
	        bulkListAnchor.grab(spanArrow);

	        // then add the ul children of it
	        $('bulkActions').grab(bulkListChildren);	        

	    } // end bulkActions.lenght
    	
    } // end of fixToolbar
});