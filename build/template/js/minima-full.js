/** 
 * @package     Minima
 * @author      Henrik Hussfelt, Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 *
 *				This Class is mainly for code-readability.
 */

var MinimaClass = new Class({
    
    Implements: [Options],

    options: {
    },

    elements: {
        systemMessage : null,
        jformTitle    : null
    },    

    // minima node
    minima : null,

    initialize: function(options, elements){
       // set the main node for DOM selection
        this.minima = document.id(this.options.minima) || document.id('minima');
        // Set options
        this.setOptions(options);
        // Set elements
        this.elements = elements;
    },

    showSystemMessage: function() {
        // system-message fade
        if (this.elements.systemMessage && this.elements.systemMessage.getElement("ul li:last-child")) {
            var _this = this,
                hideAnchor = new Element('a', {
                'href': '#',
                'id': 'hide-system-message',
                'html': 'hide',
                'events': {
                    'click': function(e){
                        _this.elements.systemMessage.dissolve({duration: 'short'})
                    }
                }
            });
            // inject hideAnchor in the system-message container
            this.elements.systemMessage.show().getElement("ul li:last-child").adopt(hideAnchor);
        };
    },

    dynamicTitle: function() {        
        
        // save the h2 element
        var h2Title     = this.minima.getElement('.pagetitle h2'),
            jformAlias  = $('jform_alias'),
            _this       = this;

        // change the h2 title dynamically
        // set the title of the page with the jform_title
        if(this.elements.jformTitle.get("value") != "") h2Title.set('html', this.elements.jformTitle.get("value"));
        
        // change while typing it
        this.elements.jformTitle.addEvent('keyup', function(event){
            // show h2 with the title typed
            if (_this.elements.jformTitle.get("value") != ""){
               h2Title.set('html', this.get("value"));
            }
            //fix alias automatically, removing extra chars, all lower cased
            // but only if it's a new content
            if (_this.minima.hasClass('no-id') && jformAlias) {
                jformAlias.set( 'value', this.get("value").standardize().replace(/\s+/g, '-').replace(/[^-\w]+/g, '').toLowerCase() );
            }
        });
        
    },

    makeRowsClickable: function() {
        // get the toggle element
        var toggle = $$('input[name=checkall-toggle]');        
        // add the real click event
        toggle.addEvent('click', function(){
            var rows = $$('.adminlist tbody tr');
            rows.toggleClass('selected');
        });

        $$('.adminlist tbody tr input[type=checkbox]').each(function(element){
                
            var parent = element.getParent('tr'), // get parent                
                boxchecked = $$('input[name=boxchecked]'); // get boxchecked

            // add click event
            element.addEvent('click', function(event){
                event && event.stopPropagation();

                if (element.checked) {
                    parent.addClass('selected');
                } else {
                    parent.removeClass('selected');
                }
            });

            // add click event
            parent.addEvent('click', function(){
                if (element.checked) {
                    element.set('checked', false);
                    boxchecked.set('value',0)
                }else{
                    element.set('checked', true);
                    boxchecked.set('value', 1);
                }
                element.fireEvent('click');
            });

        });

        // highlight the sorting column
        $$('.adminlist th img').getParent('th').addClass('active');
    }
    
});    var MinimaFilterBarClass = new Class({

    Implements: [Options],

    options: {},

    // minima node
    minima: null,

    // labels statuses strings
    filterStatusLabels : {        
        "true": "Hide search & filters",
        "false":  "Show search & filters"
    },

    // boolean that tells if the filter is active or not
    isActive : false,

    // page title string
    pageTitle : "",

    // dom elements
    elements: {
        filterBar : null
    },
    
    // the filter elements
    filterSlide  : null,
    filterAnchor : null,

    // constructor
    initialize: function(options, elements, lang) {        
        // set the main node for DOM selection
        this.minima = $(this.options.minima) || $('minima');
        // set options
        this.setOptions(options);
        // set elements
        this.elements = elements;
        // set the labels
        if (lang.length) {
            this.setLabelsLanguage(lang['hideFilter'], lang['showFilter']);                
        }
    },

    // set the language
    setLabelsLanguage: function(hideFilter, showFilter) {        
        if (hideFilter.length && showFilter.length) {            
            this.filterStatusLabels['true']  = hideFilter;
            this.filterStatusLabels['false'] = showFilter;
        }
    },

    createSlideElements: function() {
        var _this = this;
        this.filterSlide  = new Fx.Slide(this.elements.filterBar).hide();
        this.filterAnchor = new Element('a', {
                                    'href': '#minima',
                                    'id': 'open-filter',
                                    'html': _this.filterStatusLabels['false'],                                    
                                    'events': {
                                        'click': function(e){
                                            var filterSearch = $('filter_search');
                                            e.stop();
                                            _this.filterSlide.toggle();
                                            this.toggleClass("active");                    
                                            if (this.hasClass("active") && filterSearch) {
                                                filterSearch.focus();
                                            }; 
                                            if ($('content-top').hasClass('fixed')) {
                                                window.scrollTo(0,0);
                                            };
                                        }
                                    }
                                });        
    },

    // put the new anchor in place
    fixAnchor: function() {
        this.minima.getElement('.pagetitle').grab(this.filterAnchor);        
    },

    // when filters change
    onFilterSelected: function() {
        var _this  = this;
        filterBar.getElements('input, select').each(function(el) {
            var value = el.get('value');
            if (value) {
                _this.isActive = true;
                _this.pageTitle += ( el.get('tag').toLowerCase() == "select" ) ?
                    el.getElement("option:selected").get("html").toLowerCase() + " " : _this.pageTitle += value.toLowerCase() + " ";
                _this.addFiltersToTitle();
            };
        });
    },

    // change title adding the filters as well
    addFiltersToTitle: function() {
        // and change <h2> showing the selected filters
        var h2Title = minima.getElement('.pagetitle h2');
        // if the string contains something
        if (this.pageTitle.length) {
            // change the h2 with the new string
            // don't add "- select -" strings
            if (!this.pageTitle.contains("-")) {
                h2Title.set( 'html', h2Title.get('html') + "<em>( "+this.pageTitle+")</em>" );
            }
        };
    },

    doFilterBar: function() {        
        var _this = this;
        // create the new elements necessary to work
        this.createSlideElements();
        // move anchor to proper place
        this.fixAnchor();
        // attach the listener to the inputs
        this.onFilterSelected();
        // do stuff if it's active
        if (this.isActive) {
            this.filterSlide.show(); 
            this.filterAnchor.set('html', this.filterStatusLabels[this.filterSlide.open]).addClass("active"); 
        };
        // toggle the css class and the status label (show/hide)
        this.filterSlide.addEvent('complete', function() {
            _this.filterAnchor.set('html', _this.filterStatusLabels[_this.filterSlide.open]);
        });
        // all prepared, show the filter-bar
        this.elements.filterBar.show();
        
    }

});/** 
 * @package     Minima
 * @author      Henrik Hussfelt, Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

var MinimaPanelClass = new Class({
    Implements: [Options],

    panelStatus: {
        'true': 'active',
        'false': 'inactive'
    },

    panel: null,

    options: {
        prev: '',
        next: '',
        panelList: '',
        panelPage: '',
        panelWrapper: '',
        toIncrement: 0,
        increment: 900
    },

    // minima node
    minima: null,

    // some private variables
    maxRightIncrement: null,
    panelSlide: null,
    numberOfExtensions: null,

    initialize: function(options){
        
        // set the main node for DOM selection
        this.minima = document.id(this.options.minima) || document.id('minima');
        
        // Set options
        this.setOptions(options);

        // Create a slide in this class scope
        this.panel = new Fx.Slide.Mine(this.options.panelWrapper, {
            mode: "vertical",
            transition: Fx.Transitions.Pow.easeOut
        }).hide();

        // Only execute code for tweening if there is a next-button
        if (this.options.next) {
            // Create the panel slide tween function
            this.panelSlide = new Fx.Tween( this.options.panelList, {duration: 500, transition: 'back:in:out'} );
            // how many extensions do we have
            this.numberOfExtensions = this.options.panelList.getElements("li").length;
            // increase the width basing on numberOfExtensions, allways divide by 9 because we have 9 extensions per page
            this.options.panelList.setStyle("width", Math.ceil(this.numberOfExtensions / 9) * this.options.increment );
            // dynamic max incrementation size (it depends on how many elements)
            //this.maxRightIncrement = ( this.options.increment * -( Math.ceil(this.numberOfExtensions / 9) ) ) + 900;
            this.maxRightIncrement = -Math.ceil(this.options.panelPage.getChildren().length*this.options.increment-this.options.increment);
            // Initiate showbuttons
            this.showButtons();
        };
    },

    doPrevious: function () {
        if(this.options.toIncrement < 0) {
            this.options.next.show();
            this.options.toIncrement += this.options.increment;
            this.panelSlide.pause();
            this.panelSlide.start('margin-left', this.options.toIncrement);
            // fix pagination
            this.options.panelPage.getFirst('.current').removeClass('current').getPrevious('li').addClass('current');
            // hide buttons if needed
            this.showButtons();
        }
    },

    doNext: function () {
        if(this.options.toIncrement > this.maxRightIncrement) {
            // Show previous
            this.options.prev.show();
            // Count what to increment
            this.options.toIncrement -= this.options.increment;
            // Paus slider
            this.panelSlide.pause();
            // Change marign
            this.panelSlide.start('margin-left', this.options.toIncrement);
            // fix pagination
            this.options.panelPage.getFirst('.current').removeClass('current').getNext('li').addClass('current');
            // hide buttons if needed
            this.showButtons();
        };
    },

    changeToPage: function(el) {
        // Get the page number
        var pageNumber = el.id.substr("panel-pagination-".length);
        // Paus the slidefunciton
        this.panelSlide.pause();
        // Change global toIncrement value
        this.options.toIncrement = Math.ceil(0-this.options.increment*pageNumber);
        // Execute slide
        this.panelSlide.start('margin-left', this.options.toIncrement);
        // Remove previous current class
        this.options.panelPage.getFirst('.current').removeClass('current');
        el.addClass('current');
        this.showButtons();
    },

    showButtons: function() {
        if (this.options.toIncrement == 0) {
            this.options.prev.hide();
        } else {
            this.options.prev.show();
        };
        if (this.options.toIncrement == this.maxRightIncrement) {
            this.options.next.hide();
        } else {
            this.options.next.show();
        };
    }
});/** 
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
        tabs     : null,
        content  : null
    },
        
    initialize: function(options, elements){
        // Set options
        this.setOptions(options);
        // Set elements
        this.elements = elements;
    },

    // move outside tabs the proper place
    moveTabs: function(el) {        
        // the #submenu should have a .minimaTabs class
        //this.elements.subMenu.addClass('minima-tabs');            
        // move the tbas to the right place
        // which is above the title and toolbar-box
        el.inject( $('content'),'top' );
    },

    // shows the first tab content
    showFirst: function() {
        // Show first
        this.elements.content.pick().removeClass('hide');
    },

    // hide all contents
    hideAllContent: function() {
        // Hide all
        this.elements.content.addClass('hide');
    },

    // attaches the tabs actions
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
    
});/** 
 * @package     Minima
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

 MinimaToolbarClass = new Class({

    // implements
    Implements: [Options],

    // class options
    options: {
        'toolbar' : $('toolbar'), // toolbar parent
        'toolbarElements' : $$('.toolbar-list li a'), // list of the anchor elements
        'label' : null
    },

    // arrays
    bulkActionsArray: new Array(), // array with the actions
    bulkNonActionsArray: new Array(), // array with the other elements      
        
    // minima node
    minima : null,

    // initialize the class
    initialize: function(options){
        // set the main node for DOM selection
        this.minima = document.id(this.options.minima) || document.id('minima');
        // Set options
        this.setOptions(options);
    }, // end of initialize

    // function to be called to run the class
    doToolbar: function() {
        this.sortItems();
        this.fixToolbar();        
    }, // end of doToolbar

    // sort the items between actions and non actions
    sortItems: function() {  
        // save this for further reference      
        var _this = this;
        // if we have elements to sort
        if (this.options.toolbarElements.length) {
            // go through each of them
            this.options.toolbarElements.each(function(item) {
                // whatever has a 'if' clause in the onclick value is a bulk action
                if (item.get('onclick') != null && item.get('onclick').contains('if')) {                
                   _this.bulkActionsArray.push(item.getParent('li'));                
                } else if (item.get('class') != "divider") {
                   _this.bulkNonActionsArray.push(item.getParent('li'));
                }
            });
        }       
    }, // end of sortItems

    // fix the toolbar
    fixToolbar: function() {
        // save this for further reference
        var _this = this;
        // only proccess if we have more than one in bulkActionsArray
        if (this.bulkActionsArray.length > 1) {         
            // creating new elements            
            var 
                // actions <ul>
                bulkListChildren = new Element('ul#actions').hide(), 
                // create parent <li> that will toggle the new <ul>
                bulkListParent   = new Element('li', { 
                    'id': 'bulkActions',
                    'events': {
                        'click': function(event){
                            // toggle reveal the children                        
                            this.toggleReveal(bulkListChildren,{duration: 200, styles: ['border']});
                            // switch classes to active
                            $$(_this.minima.getElement('#bulkActions > a:first-child'), _this).switchClass('active', 'inactive');
                        },
                        'outerClick': function(){
                            // hide the children
                            bulkListChildren.dissolve({duration: 250});
                            // remove the classes to inactive
                            _this.minima.getElement('#bulkActions > a:first-child').set('class','inactive');
                        }
                    }
                }),
                // parent <a>                
                bulkListAnchor = new Element('a[text= '+ this.options.label +']'),
                // arrow <span>
                spanArrow = new Element('span.arrow');                

            // sort the list alphabetically
            this.bulkActionsArray = this.bulkActionsArray.sort(function (a, b) {
                if ( a.get("text").toLowerCase() < b.get("text").toLowerCase() ) return -1;
                if ( a.get("text").toLowerCase() == b.get("text").toLowerCase() ) return 0;
                return 1;
            });

            // then add the list items
            this.bulkActionsArray.each(function(item, index) {
                // grab the action item into the list
                bulkListChildren.grab(item);
            });

            // add the new parent <li>
            // check if there's a #toolbar-new button, the #actions goes right after that
            var liLocation = ( $('toolbar-new') ) ? 'ul > li#toolbar-new' : 'ul > li';

            // inject the new bulk <li> element after according to liLocation
            bulkListParent.inject($('toolbar').getElement(liLocation), 'after');
            
            // add the new anchor and the ul children            
            bulkListParent.adopt(bulkListAnchor.grab(spanArrow), bulkListChildren);

        } // end bulkActions.lenght     
    } // end of fixToolbar

});/** 
 * @package     Minima
 * @author      Júlio Pontes
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2011 Júlio Pontes. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

var MinimaWidgetsClass = new Class({

    Implements: [Options],

    storage: null,
    
    options: {},

    // minima node
    minima : null,
    spinner: null,
    timeout: 0,

    // columns elements caching
    columns: {},
    // boxes elements caching
    boxes: {},
    
    initialize: function() {        
        // reset the localStorage
        //localStorage.clear();
        // set the main node for DOM selection
        this.minima = document.id(this.options.minima) || document.id('minima');
        // save the columns for caching
        this.columns = this.minima.getElements('.col');
        // if we have any column to work with..
        if (this.columns.length) {
            // create a spinner element
            this.spinner = new Spinner( document.id('content-cpanel') );
            // show the spinner
            this.spinner.show(true);
            // cache the boxes elements
            this.boxes = this.minima.getElements('.box');            
            // initialize LocalStorage
            this.storage = new LocalStorage();
            // load and prepare the saved positions
            this.loadPositions();
            // add widgets events
            // disabled - no menus for now!
            //this.addEvents();
            // attach the drag and drop events
            this.attachDrag();            
        } 
    },
    
    addEvents: function() {
        var that = this;
        this.boxes.each(function(widget){
            widgetId = widget.id.replace('widget-','');
            widget.getElement('a.nav-settings').addEvent('click',function(){
                that.settings(widgetId);
            });
            widget.getElement('a.nav-hide').addEvent('click',function(){
                if(widget.hasClass('expand')){
                    widget.removeClass('expand');
                    widget.addClass('minimize');
                    this.set('text','Show');
                }
                else if(widget.hasClass('minimize')){
                    widget.removeClass('minimize');
                    widget.addClass('expand');
                    this.set('text','Hide');
                }
            });
        });
    },
    
    loadPositions: function() {
        // get widgets from the storage
        widgets = this.storage.get('widgets');
        // get out if it's not set
        
        // storage at first time
        if (typeOf(widgets) == 'array' && widgets.length === 0) this.storagePositions();        
        
        if (typeOf(widgets) == 'array')
        {
            // show the loading spinner
            // loop through each column and fix it
            this.columns.each(function(position){
                widgets.each(function(widget, index){
                    if (widget.position == position.id) {
                        if( widget.id != "" )
                            $(position.id).grab($(widget.id));
                    }
                });
            });
        } else {
            // loop through each column and fix it
            var positionIndex = 0;
            var that = this;
            $$('.box').each(function(widgetElement, index){
                that.columns[positionIndex].grab(widgetElement);
                positionIndex++;
                if(positionIndex >= that.columns.length) positionIndex = 0;
            });
        }
        // all done, show them
        // hide the spinner
        this.spinner.hide(true); 
        // display the widgets one by one
        this.displayWidgets();
    },

    // animates the transition
    displayWidgets: function() {                
        // fade in the boxes
        this.boxes.each(function(el, i) {
            setTimeout(function() {                
                el.fade('in');
            }, 300 * (i * 1.5));
        });
    },
    
    storagePositions: function() {
        // ordernation array
        ordernation = new Array(); 
        this.columns.each(function(position){
            position.getElements('.box').each(function(widget, index){
                var widgetObj = {'id': widget.id,'order': index,'position': position.id};
                ordernation.push(widgetObj);
            });
        });
        this.storage.set('widgets',ordernation);
    },
    // attach the drag and drop events
    attachDrag: function(){
        var that = this;
        // create new sortables
        new Sortables( this.columns, {
            clone : true,
            handle : '.box-top',
            opacity: 0.6,
            revert: {
                duration: 500,
                trasition: 'elastic:out'
            },
            onStart: function() {
                // add class to body to tell it's dragging
                minima.addClass('onDrag');
            },
            onComplete: function(widget) {
                // not dragging anymore
                minima.removeClass('onDrag');
                // save the positions after dropping
                that.storagePositions();
            }
        });
    },
    
    // Config action to open a modal configuration of a module
    settings: function(id) {
        var url = 'index.php?option=com_modules&client_id=0&task=module.edit&id='+id+'&tmpl=component&view=module&layout=modal';
        SqueezeBox.open(url,{handler: 'iframe', size: {x: 900, y: 550}});
    }
    
});

window.addEvent('domready', function() {
    var MinimaWidgets = new MinimaWidgetsClass();
});/** 
 * @package			Minima
 * @author			Marco Barbosa
 * @contributors	Henrik Hussfelt
 * @copyright		Copyright (C) 2010 Marco Barbosa. All rights reserved.
 * @license			GNU General Public License version 2 or later; see LICENSE.txt
 */

// EXTRAS
// ==================================================
// outerClick function
(function(){var b;var a=function(f){var d=$(f.target);var c=d.getParents();b.each(function(g){var e=g.element;if(e!=d&&!c.contains(e)){g.fn.call(e,f)}})};Element.Events.outerClick={onAdd:function(c){if(!b){document.addEvent("click",a);b=[]}b.push({element:this,fn:c})},onRemove:function(c){b=b.filter(function(d){return d.element!=this||d.fn!=c},this);if(!b.length){document.removeEvent("click",a);b=null}}}})();

// switchClass function
Element.implement('switchClass', function(a, b){ var toggle = this.hasClass(a); this.removeClass(toggle ? a : b).addClass(toggle ? b : a); return this; });

// extending Selector for a visible boolean
$extend(Selectors.Pseudo,{visible:function(){if(this.getStyle("visibility")!="hidden"&&this.isVisible()&&this.isDisplayed()){return this}}});

// toggle for reveal or dissolve
Element.implement('toggleReveal', function(el, options) {
    return el.isDisplayed() ? el.dissolve(options) : el.reveal(options);
});

// PLUGINS
// ==================================================
// ScrollSpy by David Walsh (http://davidwalsh.name/js/scrollspy)
var ScrollSpy=new Class({Implements:[Options,Events],options:{container:window,max:0,min:0,mode:"vertical"},initialize:function(a){this.setOptions(a);this.container=document.id(this.options.container);this.enters=this.leaves=0;this.inside=false;this.listener=function(d){var b=this.container.getScroll(),c=b[this.options.mode=="vertical"?"y":"x"];if(c>=this.options.min&&(this.options.max==0||c<=this.options.max)){if(!this.inside){this.inside=true;this.enters++;this.fireEvent("enter",[b,this.enters,d])}this.fireEvent("tick",[b,this.inside,this.enters,this.leaves,d])}else{if(this.inside){this.inside=false;this.leaves++;this.fireEvent("leave",[b,this.leaves,d])}}this.fireEvent("scroll",[b,this.inside,this.enters,this.leaves,d])};this.addListener()},start:function(){this.container.addEvent("scroll",this.listener.bind(this))},stop:function(){this.container.removeEvent("scroll",this.listener.bind(this))},addListener:function(){this.start()}});

// DOMREADY
window.addEvent('domready', function() {

    // Initiate some global variables
    // -------------------------------     
    var 
        // get the language strings
        language        = MooTools.lang.get('Minima');
        // DOM variables                
        contentTop      = $('content-top'),
        toolbar         = $('toolbar'),
        topHead         = $('tophead'),
        minima          = $('minima'),
        subMenu         = $('submenu'),
        itemForm        = $('item-form'),
        filterBar       = $('filter-bar'),
        // Initiate MimimaClass
        Minima          = new MinimaClass({},{
                                  systemMessage : $('system-message'),
                                  jformTitle    : $('jform_title')
                              }),
        // Initiate MinimaToolbar
        MinimaToolbar   = new MinimaToolbarClass({
                                  'toolbar'         : toolbar, // toolbar parent
                                  'toolbarElements' : minima.getElements('.toolbar-list li a'), // list of the anchor elements
                                  'label'           : language['actionBtn']
                              }),
        MinimaFilterBar = new MinimaFilterBarClass({}, {
                                  'filterBar' : filterBar
                              }, {
                                  'hideFilter' : language['hideFilter'],
                                  'showFilter' : language['showFilter']
                              })
    ;

    // ------------------------------- 

    // TRIGGERS
    // =============================    
    // smooth scroll when clicking "back to top"
    new Fx.SmoothScroll({
        links: '#topLink'
    });    

    // fix the filterbar
    if (filterBar) {        
        MinimaFilterBar.doFilterBar();
    }

    // Show system message (if applicable)
    Minima.showSystemMessage();

    // make title dynamic if we have one
    if ($('jform_title')) {
        Minima.dynamicTitle();
    };

    // Make whole row clickable, if there are any    
    if (minima.getElements('.adminlist').length) {
    	Minima.makeRowsClickable();
    };

    // TOOLBAR
    // =============================
    // fix the toolbar
    MinimaToolbar.doToolbar();

    // show it afterwards
    if (toolbar) {
        toolbar.show();
    };

    // TABS
    // =============================
    if (subMenu && itemForm) {
        
        // Start tabs actions, create instances of class
    	var MinimaTabsHorizontal = new MinimaTabsClass({}, {
                'tabs'    : subMenu.getElements('a'), 
                'content' : itemForm.getChildren('div')
            }),
        MinimaTabsVertical = new MinimaTabsClass({}, {
                'tabs'    : minima.getElements('.vertical-tabs a'), 
                'content' : $('tabs').getChildren('.panelform')
            });

        if (subMenu.hasClass('out')) {
            MinimaTabsHorizontal.moveTabs(subMenu);   
        }

    	// Add tabs for horizontal submenu
        // Hide all content elements
        MinimaTabsHorizontal.hideAllContent();
        // Show the first
        MinimaTabsHorizontal.showFirst();
        // Add onClick
        MinimaTabsHorizontal.addTabsAction();

        // Add tabs for vertical menu
        // Hide all content elements
        MinimaTabsVertical.hideAllContent();
        // Show the first
        MinimaTabsVertical.showFirst();
        // Add onClick
        MinimaTabsVertical.addTabsAction();
    };    

    // individual tabs, not necessairly in a form
    if (subMenu && subMenu.hasClass('out')) {
        subMenu.inject( $('content'), 'top' );
    }

    // SCROLLING
    // =============================
    // fixed content-box header when scrolling    
    var scrollSize = document.getScrollSize().y - document.getSize().y;
    
    /* scrollspy instance */    
    new ScrollSpy({
        // the minimum ammount of scrolling before it triggers
        min: 200, 
        onEnter: function() {            
            // we are in locked mode, must fix positioning
            if (scrollSize > 400) {
                if (document.body.hasClass('locked')) {
                    contentTop.setStyle('left', (topHead.getSize().x - 1140) / 2);
                };
                contentTop.setStyle('width', topHead.getSize().x - 40).addClass('fixed');
            };
        },
        onLeave: function() {
            if (scrollSize > 400) {
                contentTop.removeClass('fixed');
                if(document.body.hasClass('locked')) {
                    contentTop.setStyle('width', '100%');
                };
            };
        }
    }); 
    
    // PANEL TAB
    // ==================================================
    // tabs wrapper
    var $panelWrapper = $('panel-wrapper'),
        extra        = $('more')
        extraLists   = $('list-content'),
        openPanel    = $('panel-tab'),
        listWrapper  = $('list-wrapper');

    if ($panelWrapper) {

	    // Fixing wrapper bug
	    Fx.Slide.Mine = new Class({
	        Extends: Fx.Slide,
	        initialize: function(el, options) {
	            this.parent(el, options);
	            this.wrapper = this.element.getParent();
	        }
	    });

        // cache elements
        var $panelPagination = $('panel-pagination'),
            $prev            = $('prev'),
            $next            = $('next');

		// Create a Panel instance
		var Panel = new MinimaPanelClass({
				panelWrapper: $panelWrapper,
				prev: $prev,
				next: $next,
				panelList: $('panel-list'),
				panelPage: $panelPagination
		});

		// Setup click event for previous
		$prev.addEvent('click', function() {
			Panel.doPrevious();
		});
		// Setup click event for previous
		$next.addEvent('click', function() {
			Panel.doNext();
		});

		// Fix panel pagination
		$panelPagination.getChildren("li").addEvent('click', function() {
			// Send ID to changepage as this contains pagenumber
			Panel.changeToPage(this);
		});

        // Open the panel slide
        openPanel.addEvents({
            'click': function(){                
                //minima.getElements("#shortcuts .parent").getChildren('.sub').dissolve({duration: 200}).removeClass('hover');
                minima.getElements("#shortcuts .parent").removeClass('hover');
        		Panel.panel.toggle();
            }
        });

        // change status on toggle complete
        Panel.panel.addEvent('complete', function() {
            openPanel.set('class', Panel.panelStatus[Panel.panel.open]);
        });

        // slide up panel when clicking a link
        minima.getElements('#panel-list li').addEvent('click', function(){            
            Panel.panel.toggle();
        });

    }; // end of if($panelWrapper)


    // dropdown menu
    if (extra) {
        extra.addEvent('click', function(){            
            this.switchClass('active','inactive');            
            //extraLists.toggle();
            this.toggleReveal(extraLists, {heightOverride: '155',duration: 250});
        });
    }

    var hideLists = function() {
        extra.set('class','inactive');
        listWrapper.removeClass('active');
        extraLists.dissolve();            
    };

    // turn off list when click outside
    if (listWrapper) {
        listWrapper.addEvent('outerClick', function(){
            hideLists();
        });
    }

    // turn off list when clicking a link
    if (extraLists) {
        extraLists.getElements("a").addEvent('click', function(){
            hideLists();
        });
    }

    minima.getElements('#shortcuts .parent').each(function(li) {             
        // add events to the list elements
        li.addEvents({
           'click' : function() {                    
                // show or hide when click on the arrow                    
                this.toggleReveal(this.getChildren('.sub')[0]).toggleClass('hover');                    
                this.getElement('a').toggleClass('hover');
           },
           'outerClick' : function() {
                // hide when clicking outside or on a different element                    
                this.getChildren('.sub').dissolve({duration: 200}).removeClass('hover');
                this.getElement('a').removeClass('hover');
           }
        });            
    });

    // dashboard icons actions
    //if (minima.hasClass('com_cpanel')) {        
        // minima.getElements('.box-icon').addEvent('click', function() {        
        //     this.toggleClass('hover').getParent('nav').toggleReveal(this.getNext('ul'), { duration: 200});
        // });
        // minima.getElements('.box-icon').addEvent('outerClick', function(){
            //this.toggleClass('hover').getParent('nav').dissolve();
            //this.getParent('nav').getNext('ul').dissolve();
        // }); 
    // }
/*
    var cleanSelectedRows = function() {        
        minima.getElements('td.selected').removeClass('selected');
    }

    minima.getElements('.adminlist thead th').addEvents({        
        mouseenter : function() {
            var nColumn = this.getAllPrevious('th').length + 1;
            if (nColumn > 1) {
                cleanSelectedRows();
                minima.getElements('.adminlist td:nth-child('+nColumn+')').addClass('selected');            
            }
        },
        mouseleave : function() {
            cleanSelectedRows();            
        }
    });
*/
});
