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

window.addEvent('domready', function() { 

    // FIXES
	// =============================
  
    // tell css that the document is ready
    $(document.body).addClass('ready');

    // toolbar is hidden until body is ready
    // show it back the toolbar after done fixing it
    if (toolbar) toolbar.show();


    // FIXME must see if this is necessary
    // some tables don't have an id of #adminlist
    // so add it if not found
    var adminlist = $$('.adminlist'),
    subMenu = $('submenu'),
    jformTitle = $('jform_title'),
    itemForm = $('item-form'),
    language = MooTools.lang.get('Minima');

    if (adminlist.length && adminlist.get('id') != 'adminlist') adminlist.set('id','adminlist');    

    // position aditional tabs to #submenu position
    if (subMenu) subMenu.addClass('minimaTabs');            

    // some overrides have tabs that are out of place   
    if ((subMenu && subMenu.hasClass('out')) || (subMenu && itemForm)) {
        // hide the tabs content
        //if (itemForm) itemForm.getChildren('div').addClass('hide');
        // position the tabs on the right place
        subMenu.inject($('content'),'top');
    }; // end of subMenu

    // FIXME must see if this is necessary
    // fix padding when there are no tabs
    if (!filterBar  && $$('.adminlist')) $$('.adminlist').addClass('padTop');


    // change the h2 title dynamically
    if (jformTitle) {
        // set the title of the page with the jform_title
        if(jformTitle.get("value") != "") $$('.pagetitle h2').set('html', jformTitle.get("value"));
        // change while typing it
        jformTitle.addEvent('keyup', function(event){
            // show h2 with the title typed
            if(jformTitle.get("value") != "") $$('.pagetitle h2').set('html', this.get("value"));
            //fix alias automatically, removing extra chars, all lower cased
            $('jform_alias').set( 'value', this.get("value").standardize().replace(/\s+/g, '-').replace(/[^-\w]+/g, '').toLowerCase() );
        });
    }; // end jform_title


        // make filter-bar a slide    
    if (filterBar)
    {
        // status of the filter, if it's on or off
        var filterStatus = {
            'true':  language['closeFilter'],
            'false': language['showFilter']
        };

        var filterSlide = new Fx.Slide(filterBar).hide();

        // filter anchor element
        var filterAnchor = new Element('a', {
            'href': '#minima',
            'id': 'open-filter',
            'html': language['closeFilter'],
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
        var filterActive = false;
        var pageTitle = "";

        // FIXME not detecting correctly
        // we must find out if any of the filters are in use (selected)
        filterBar.getElements('input, select').each(function(el) {
            var elValue = el.get('value');
            // if any filter is selected
            if (elValue && elValue != 0 && elValue != '*')
            {
                // set to active
                filterActive = true;
                // add the selected filters to the pageTitle
                pageTitle += ( el.get('tag').toLowerCase() == "select" ) ?
                    el.getElement("option:selected").get("html").toLowerCase() + " " : pageTitle += elValue.toLowerCase() + " ";
            }
        });

        // if filter is active then show #filter-bar
        if (filterActive) filterSlide.show(); filterAnchor.set('html', filterStatus[filterSlide.open]);
        // and change <h2> showing the selected filters
        var h2Title = $$('.pagetitle').getElement('h2');

        if (pageTitle) h2Title.set( 'html', h2Title.get('html') + "<em>( "+pageTitle+")</em>" );
        // -------------------------------

        // change status on toggle complete
        filterSlide.addEvent('complete', function() {
            filterAnchor.set('html', filterStatus[filterSlide.open]);
        });

        // add the filter anchor next to pagetitle
        $$('.pagetitle').grab(filterAnchor);
        //$$('.pagetitle h2').inject(filterAnchor, 'before');
        
        // hidden to avoid flicker, show it back after done fixing it
        filterBar.show();
    } //end filter-bar  



});