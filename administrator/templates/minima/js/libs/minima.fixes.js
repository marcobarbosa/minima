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
    var adminlist = $$('.adminlist');
    if (adminlist.length && adminlist.get('id') != 'adminlist') adminlist.set('id','adminlist');

    // get the submenu (tabs) to work
    var subMenu =  $('submenu');
    var itemForm = $('item-form');

    // position aditional tabs to #submenu position
    if (subMenu) subMenu.addClass('minimaTabs');            

    // some overrides have tabs that are out of place   
    if ((subMenu && subMenu.hasClass('out')) || (subMenu && $('item-form'))) {
        // hide the tabs content
        if (itemForm) itemForm.getChildren('div').addClass('hide');
        // position the tabs on the right place
        subMenu.inject($('content'),'top');
    }; // end of subMenu

    // FIXME must see if this is necessary
    // fix padding when there are no tabs
    if (!filterBar  && $$('.adminlist')) $$('.adminlist').addClass('padTop');

    // change the h2 title dynamically
    if ($('jform_title')) {
        // set the title of the page with the jform_title
        if($('jform_title').get("value") != "") $$('.pagetitle h2').set('html', $('jform_title').get("value"));
        // change while typing it
        $('jform_title').addEvent('keyup', function(event){
            // show h2 with the title typed
            if($('jform_title').get("value") != "") $$('.pagetitle h2').set('html', this.get("value"));
            //fix alias automatically, removing extra chars, all lower cased
            $('jform_alias').set( 'value', this.get("value").standardize().replace(/\s+/g, '-').replace(/[^-\w]+/g, '').toLowerCase() );
        });
    }; // end jform_title
