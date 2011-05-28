
window.addEvent('domready', function() { 

    // FIXES
	// =============================
  
    var 
        minima      = $('minima'),
        adminlist   = minima.getElement('.adminlist'),
        subMenu     = $('submenu'),
        jformTitle  = $('jform_title'),
        jformAlias  = $('jform_alias'),
        itemForm    = $('item-form'),        
        h2Title     = minima.getElement('.pagetitle h2'),
        filterBar   = $('filter-bar'),

        language    = MooTools.lang.get('Minima');

    
    // change the h2 title dynamically
    if (jformTitle) {
        // set the title of the page with the jform_title
        if(jformTitle.get("value") != "") h2Title.set('html', jformTitle.get("value"));
        // change while typing it
        jformTitle.addEvent('keyup', function(event){
            // show h2 with the title typed
            if(jformTitle.get("value") != ""){
               h2Title.set('html', this.get("value"));
            }
            //fix alias automatically, removing extra chars, all lower cased
            // but only if it's a new content
            if (minima.hasClass('no-id') && jformAlias) {
                jformAlias.set( 'value', this.get("value").standardize().replace(/\s+/g, '-').replace(/[^-\w]+/g, '').toLowerCase() );
            }
        });
    }; // end jform_title

    // make filter-bar a slide    
    if (filterBar) {
       
        // status of the filter, if it's on or off
        var 
            // the status of the filter
            filterStatus = {
                'true':  language['closeFilter'],
                'false': language['showFilter']
            },
            // the Fx slide
            filterSlide = new Fx.Slide(filterBar).hide(),		
            // the "open filter" anchor
            filterAnchor = new Element('a', {
                'href': '#minima',
                'id': 'open-filter',
                'html': language['showFilter'],
                'events': {
                    'click': function(e){
                        e.stop();
                        filterSlide.toggle();
                        this.toggleClass("active");                    
                        if (this.hasClass("active")) {
                          $('filter_search').focus();  
                        } 
                        if (contentTop.hasClass('fixed')) {
                            window.scrollTo(0,0);                        
                        }
                    }
                }
            });
		
		// show filter if it's being used
        // -------------------------------
        var filterActive = false,
            pageTitle = "";

        // FIXME not detecting correctly
        // we must find out if any of the filters are in use (selected)
        
        filterBar.getElements('input, select').each(function(el) {
        	var elValue = el.get('value');        	
        	// if any filter is selected
            if (elValue) {    		
                // set to active
                filterActive = true;
                // add the selected filters to the pageTitle
                pageTitle += ( el.get('tag').toLowerCase() == "select" ) ?
                    el.getElement("option:selected").get("html").toLowerCase() + " " : pageTitle += elValue.toLowerCase() + " ";
            }
        });
                
        // if filter is active then show #filter-bar
        if (filterActive) {
        		filterSlide.show(); 
        		filterAnchor.set('html', filterStatus[filterSlide.open]).addClass("active"); 
        }      		

        
        // and change <h2> showing the selected filters
        var h2Title = $$('.pagetitle').getElement('h2');

        if (pageTitle) h2Title.set( 'html', h2Title.get('html') + "<em>( "+pageTitle+")</em>" );
        // -------------------------------

        // change status on toggle complete
        filterSlide.addEvent('complete', function() {
            filterAnchor.set('html', filterStatus[filterSlide.open]);
        });

        // add the filter anchor next to pagetitle
        minima.getElement('.pagetitle').grab(filterAnchor);
        //$$('.pagetitle h2').inject(filterAnchor, 'before');
        
        // hidden to avoid flicker, show it back after done fixing it
        filterBar.show();
        
    } //end filter-bar  



});