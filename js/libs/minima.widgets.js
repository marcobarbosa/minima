/** 
 * @package     Minima
 * @author      Júlio Pontes
 * @copyright   Copyright (C) 2010 Júlio Pontes. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

var MinimaWidgetsClass = new Class({

    Implements: [Options],

    storage: null,
    
    options: {},

    // minima node
    minima : null,

    // columns elements caching
    columns: {},
    
    initialize: function() {        
        // reset the localStorage
        //localStorage.clear();
        // set the main node for DOM selection
        this.minima = document.id(this.options.minima) || document.id('minima');
        // save the columns for caching
        this.columns = this.minima.getElements('.col');
        // if we have any column to work with..
        if (this.columns.length) {
            // initialize LocalStorage
            this.storage = new LocalStorage();
            // load and prepare the saved positions
            this.loadPositions();
            // attach the drag and drop events
            this.attachDrag();
        }
    },
    
    loadPositions: function() {
        // get widgets from the storage
        widgets = this.storage.get('widgets');
        // get out if it's not set
        if (typeOf(widgets) != 'array') return false;
        // ...
        if (widgets.length == 0) this.storagePositions();        
        // loop through each column and fix it
        this.columns.each(function(position){
            widgets.each(function(widget){
                if (widget.position == position.id) {
                    $(position.id).grab($(widget.id));
                }
            });
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
            onComplete: function(widget){            
                that.storagePositions();
            }
        });
    },
    
    config: function(id) {
        var url = 'index.php?option=com_modules&client_id=0&task=module.edit&id='+id+'&tmpl=component&view=module&layout=modal';
        //console.log(url);        
        SqueezeBox.open(url,{handler: 'iframe', size: {x: 900, y: 550}});
    }
});

window.addEvent('domready', function() {
    var MinimaWidgets = new MinimaWidgetsClass();
});