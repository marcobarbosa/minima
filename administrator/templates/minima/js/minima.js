/**
 * @version     0.8
 * @package     Minima
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* special thanks to these cool #mootools folks:
 * d_mitar
 * rev087
 * keeto
 * fakedarren
 * FunFactor
 * csuwldcat
 * rpflo
 * Oskar__
 * boushley
 * Garrick
 * thanks for the kind help! (by m4co)
 * */

// outerClick function
(function(){var b;var a=function(f){var d=$(f.target);var c=d.getParents();b.each(function(g){var e=g.element;if(e!=d&&!c.contains(e)){g.fn.call(e,f)}})};Element.Events.outerClick={onAdd:function(c){if(!b){document.addEvent("click",a);b=[]}b.push({element:this,fn:c})},onRemove:function(c){b=b.filter(function(d){return d.element!=this||d.fn!=c},this);if(!b.length){document.removeEvent("click",a);b=null}}}})();

// switchClass function
Element.implement('switchClass', function(a, b){ var toggle = this.hasClass(a); this.removeClass(toggle ? a : b).addClass(toggle ? b : a); return this; });

// extending Selector for a visible boolean
$extend(Selectors.Pseudo,{visible:function(){if(this.getStyle("visibility")!="hidden"&&this.isVisible()&&this.isDisplayed()){return this}}});

/*
 * ElementFilter by David Walsh (http://davidwalsh.name/plugin-element-filter)
 */
var ElementFilter=new Class({Implements:[Options,Events],options:{cache:true,caseSensitive:false,ignoreKeys:[13,27,32,37,38,39,40],matchAnywhere:true,property:"text",trigger:"keyup",onStart:$empty,onShow:$empty,onHide:$empty,onComplete:$empty},initialize:function(c,b,a){this.setOptions(a);this.observeElement=document.id(c);this.elements=$$(b);this.matches=this.elements;this.misses=[];this.listen();},listen:function(){this.observeElement.addEvent(this.options.trigger,function(a){if(this.observeElement.value.length){if(!this.options.ignoreKeys.contains(a.code)){this.fireEvent("start");this.findMatches(this.options.cache?this.matches:this.elements);this.fireEvent("complete");}}else{this.findMatches(this.elements,false);}}.bind(this));},findMatches:function(f,b){var e=this.observeElement.value;var a=this.options.matchAnywhere?e:"^"+e;var g=this.options.caseSensitive?"":"i";var c=new RegExp(a,g);var d=[];f.each(function(i){var h=(b==undefined?c.test(i.get(this.options.property)):b);if(h){if(!i.retrieve("showing")){this.fireEvent("show",[i]);}d.push(i);i.store("showing",true);}else{if(i.retrieve("showing")){this.fireEvent("hide",[i]);}i.store("showing",false);}return true;}.bind(this));return d;}});

/*
 * mooPlaceholder by Dimitri Christoff (http://fragged.org/mooplaceholder-input-placeholder-behaviour-class_1081.html)
 */
 var mooPlaceholder=new Class({Implements:[Options],options:{htmlPlaceholder:"placeholder",unmoddedClass:"unchanged",parentNode:document,defaultSelector:"input[placeholder]"},initialize:function(a){this.setOptions(a);this.nativeSupport="placeholder" in document.createElement("input")},attachToElements:function(a){var b=this.options.parentNode.getElements(a||this.options.defaultSelector);if(b.length){b.each(function(c){this.attachEvents(c)},this)}},attachEvents:function(a,b){var b=b||a.get(this.options.htmlPlaceholder);if(this.nativeSupport||!$(a)||!b||!b.length){return}a.set("value",b).store("placeholder",b);if(this.options.unmoddedClass){a.addClass(this.options.unmoddedClass)}a.addEvents({change:function(){var c=a.get("value").trim(),d=a.retrieve("placeholder");if(c!=d){a.removeClass(this.options.unmoddedClass).removeEvents("change")}}.bind(this),focus:function(){var c=a.get("value").trim(),d=a.retrieve("placeholder");if(c==d){a.set("value","").removeClass(this.options.unmoddedClass)}}.bind(this),blur:function(){var c=a.get("value").trim(),d=a.retrieve("placeholder");if(c==d||c==""){a.set("value",d).addClass(this.options.unmoddedClass)}}.bind(this)})}});

// tabs plugin
/*var minimaTabs = new Class ({

    initialize: function(cont,tabs)
    {
        this.cont = cont;
        this.tabs = tabs;
    }

    hideTabs: function(cont)
    {
        // hide all tabs contens
        cont.addClass('hide');

        // except the first one
        cont[0].removeClass('hide');
        return this;
    }, // end of hideTabs

    doTabs: function(cont,tabs)
    {
         this.hideTabs(cont);
         tabs.each(function(tab, index){
            tab.addEvents({
                click: function(e){
                    e.stop();

                    tabs.removeClass('active');
                    this.addClass('active');

                    cont.addClass('hide');
                    cont[index].removeClass('hide');
                }
            });

        });
    } // end of doTabs

});*/

window.addEvent('load', function() {

});

window.addEvent('domready', function() {

    // mooPlaceholder to use html5 placeholder
    //new mooPlaceholder().attachEvents($("search-term"));

    // Iphone checkboxes
    (function(a){this.IPhoneCheckboxes=new Class({Implements:[Options],options:{checkedLabel:"ON",uncheckedLabel:"OFF",background:"#fff",containerClass:"iPhoneCheckContainer",labelOnClass:"iPhoneCheckLabelOn",labelOffClass:"iPhoneCheckLabelOff",handleClass:"iPhoneCheckHandle",handleBGClass:"iPhoneCheckHandleBG",handleSliderClass:"iPhoneCheckHandleSlider",elements:"input[type=checkbox].check"},initialize:function(b){this.setOptions(b);this.elements=$$(this.options.elements);this.elements.each(function(c){this.observe(c)},this)},observe:function(e){e.set("opacity",0);var d=new Element("div",{"class":this.options.containerClass}).inject(e.getParent());e.inject(d);var g=new Element("div",{"class":this.options.handleClass}).inject(d);var c=new Element("div",{"class":this.options.handleBGClass,style:this.options.background}).inject(g);var i=new Element("div",{"class":this.options.handleSliderClass}).inject(g);var b=new Element("label",{"class":this.options.labelOffClass,text:this.options.uncheckedLabel}).inject(d);var f=new Element("label",{"class":this.options.labelOnClass,text:this.options.checkedLabel}).inject(d);var h=d.getSize().x-39;e.offFx=new Fx.Tween(b,{property:"opacity",duration:200});e.onFx=new Fx.Tween(f,{property:"opacity",duration:200});d.addEvent("mouseup",function(){var l=!e.checked;var j=(l?h:0);var k=(l?34:0);c.hide();new Fx.Tween(g,{duration:100,property:"left",onComplete:function(){c.setStyle("left",k).show()}}).start(j);if(l){e.offFx.start(0);e.onFx.start(1)}else{e.offFx.start(1);e.onFx.start(0)}e.set("checked",l)});if(e.checked){b.set("opacity",0);f.set("opacity",1);g.setStyle("left",h);c.setStyle("left",34)}else{f.set("opacity",0);c.setStyle("left",0)}}})})(document.id);

    // instanciate
    //var chx = new IPhoneCheckboxes();

    /* ----------------------------- */

    // get the language strings
    var language = MooTools.lang.get('Minima');

    /* TOOLBAR
     * ================================================== */

    // save all anchors first
    var toolbarElements = $$('.toolbar-list li a');
    var toolbar = $('toolbar');
    var bulkActions = new Array();
    var bulkNonActions = new Array();

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

    /* ----------------------------- */
    // create elements
    if(bulkActions.length)
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
                    bulkListChildren.toggle();
                    $$('#bulkActions > a:first-child').switchClass('active', 'inactive');
                    this.switchClass('active', 'inactive');
                },
                'outerClick': function(){
                    bulkListChildren.hide();
                    $$('#bulkActions > a:first-child').set('class','inactive');
                }
            }
        });

        // and add the anchor to this parent <li>
        var bulkListAnchor   = new Element('a', {'html': language['actionBtn']}); // parent anchor
        var spanArrow        = new Element('span', {'class' : 'arrow'}); // arrow

        /* ----------------------------- */
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

    /* FIXES
     * ============================= */
    // show back the toolbar after done fixing it
    if (toolbar) toolbar.show();

    $(document.body).addClass('ready');
    $(document.body).removeClass('no-js');

    // add id #adminlist to .adminlist
    var adminlist = $$('.adminlist');
    if (adminlist.length) adminlist.set('id','adminlist');

    // add tabs to #submenu
    if ($('submenu') ) $('submenu').addClass('minimaTabs');

    // remove border on empty lists
    /*border-top: 1px dashed #e0e0e0;*/

    // system-message fade
    var systemMessage = $('system-message');
    if (systemMessage && systemMessage.getElement("ul li:last-child"))
    {
        var hideAnchor = new Element('a', {
            'href': '#',
            'id': 'hide-system-message',
            'html': 'hide',
            'events': {
                'click': function(e){
                    systemMessage.dissolve({duration: 'short'})
                }
            }
        });

        // inject hideAnchor in the system-message container
        systemMessage.show().getElement("ul li:last-child").adopt(hideAnchor);
    }

    // highlighting the ACL rules changes for better accessibility
    if ($('rules'))
    {
        $$('.jpane-toggler').addEvent('click', function() {
            var caption = this.getNext('.jpane-slider').getElement('caption');
            if (caption) caption.set('tween', {duration: '2000'}).highlight('#ffd');
        })
    }

    // get the submenu (tabs) to work
    var subMenu =  $('submenu');

    // fix submenu position on overrides
    if ( (subMenu && subMenu.hasClass('out')) || (subMenu && $('item-form')) )
    {
        // move the submenu to the top of content
        subMenu.inject($('content'),'top');
    }

    // fix left border on toolbar
    /*if( !subMenu && $('toolbar-box') )
    {
        //$('toolbar-box').addClass('borderLeft');
    }
    else if( $('item-form') )*/
    if (subMenu && $('item-form'))
    {

        /* Adding the tabs functionality
         * -------------------------------- */

        var tabs = $$('.minimaTabs a'), cont = $('item-form').getChildren('div').addClass('hide');

        // hide all tabs contens
        //cont.addClass('hide');

        // except the first one
        cont[0].removeClass('hide');

        tabs.each(function(tab, index){
            tab.addEvents({
                click: function(e){
                    e.stop();

                    tabs.removeClass('active');
                    this.addClass('active');

                    cont.addClass('hide');
                    cont[index].removeClass('hide');
                }
            }); //end of tab.addEvents
        }); // end of tabs.each

        /* Adding the tabs functionality again
         * TODO Make this a class!
         * -------------------------------- */

        var tabs2 = $$('#advanced-tabs a'), cont2 = $('tabs').getChildren('.panelform').addClass('hide');

        // hide all tabs contens
        //cont2.addClass('hide');

        // except the first one
        cont2[0].removeClass('hide');

        tabs2.each(function(tab2, index){
            tab2.addEvents({
                click: function(e){
                    e.stop();

                    tabs2.removeClass('active');
                    this.addClass('active');

                    cont2.addClass('hide');
                    cont2[index].removeClass('hide');
                }
            }); //end of tab.addEvents
        }); // end of tabs.each

        /*var tabs = $$('.minimaTabs a'), cont = $('item-form').getChildren('div');
        var minimaTabs = new minimaTabs();
        minimaTabs.doTabs();*/

    }

    // fix padding when there's no tabs
    if ( !$('filter-bar')  && $$('.adminlist') ){ $$('.adminlist').addClass('padTop');}

    // make whole row clickable
    if ($$('.adminlist').length)
    {
        // get the toggle element
        var toggle = $$('input[name=checkall-toggle]');
        // now remove the horrible onClick event
        //toggle.set("onclick",null);
        // add the real click event
        toggle.addEvent('click', function(){
            var rows = $$('.adminlist tbody tr');
            rows.toggleClass('selected');
        });

        $$('.adminlist tbody tr input[type=checkbox]').each(function(element){

            var parent = element.getParent('tr');

            var boxchecked = $$('input[name=boxchecked]');

            element.addEvent('click', function(event){
                event && event.stopPropagation();

                if (element.checked) {
                    parent.addClass('selected');
                } else {
                    parent.removeClass('selected');
                }
            });

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
        var sortImg = $('adminlist').getElements('th img');
        sortImg.getParent('th').addClass('active');

    }// end .adminlist

    // change h2 while typing title
    if ($('jform_title'))
    {
        if($('jform_title').get("value") != "")  $$('.pagetitle h2').set('html', $('jform_title').get("value"));
        $('jform_title').addEvent('keyup', function(event){
            // show h2 with the title typed
            if($('jform_title').get("value") != "") $$('.pagetitle h2').set('html', this.get("value"));
            //fix alias
            $('jform_alias').set( 'value', this.get("value").standardize().replace(/\s+/g, '-').replace(/[^-\w]+/g, '').toLowerCase() );
        });
    } // end jform_title

    /* FILTER ACCORDION
     * ================================================== */

    // make filter-bar a slide
    var bar = $('filter-bar');
    if (bar)
    {

        // status of the filter, if it's on or off
        var filterStatus = {
            'true':  language['closeFilter'],
            'false': language['showFilter']
        };

        var filterSlide = new Fx.Slide(bar).hide();

        // filter anchor element
        var filterAnchor = new Element('a', {
            'href': '#',
            'id': 'open-filter',
            'html': language['closeFilter'],
            'events': {
                'click': function(e){
                    e.stop();
                    filterSlide.toggle();
                    this.toggleClass("active");
                }
            }
        });

        // show filter if it's being used
        // -------------------------------
        var filterActive = false;
        var pageTitle = "";

        bar.getElements('input, select').each(function(el) {
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

        bar.show();
    } //end filter-bar


    /* PANEL TAB
     * ================================================== */

    // tabs wrapper
    var tabsWrapper = $('panel-wrapper');

    if (tabsWrapper)
    {

        // status of the filter, if it's on or off
        var panelStatus = {
            'true': 'active',
            'false': 'inactive'
        };

        // fixing wrapper bug - thanks to d_mitar
        Fx.Slide.Mine = new Class({
            Extends: Fx.Slide,
            initialize: function(el, options) {
                this.parent(el, options);
                this.wrapper = this.element.getParent();
                this.wrapper.setStyles({
                    //"float": "left",
                    //"display": "inline"
                });
            },
            onStart: function() {
                // do stuff to this.wrapper if wanted
            }

        });

        var panel = new Fx.Slide.Mine(tabsWrapper, {
            mode: "vertical",
            transition: Fx.Transitions.Pow.easeOut
        }).hide();

        // Adding horizontal sliders
        var prev = $('prev');
        var next = $('next');
        var panelList = $('panel-list');

        if (next) {
            var toIncrement = 0,
                increment = 900;
            // creating the slider
            var panelSlide = new Fx.Tween( panelList, {duration: 500, transition: 'back:in:out'} );
            // how many extensions
            var extNum = panelList.getChildren("li").length;
            // increase the width basing on extNum
            panelList.setStyle("width", Math.round(extNum / 9) * 900 );
            // dynamic max incrementation size (it depends on how many elements)
            var maxRightIncrement = ( increment * -( Math.ceil(extNum / 9) ) ) + 900;

            // pagination
            var panelPage = $('panel-pagination');

            // fix buttons visualization
            var showButtons = function() {
                /*if (toIncrement == 0 && !prev.hasClass('disabled')) prev.addClass('disabled');
                else prev.removeClass('disabled');

                if (toIncrement == maxRightIncrement && !next.hasClass('disabled')) next.addClass('disabled');
                else next.removeClass('disabled');*/
                if (toIncrement == 0) prev.hide();
                else if (toIncrement == maxRightIncrement) next.hide();
            }

            // fix buttons for the first time
            showButtons();

            // add the buttons events
            prev.addEvent('click', function() {
                if(toIncrement < 0) {
                    next.show();
                    toIncrement += increment;
                    panelSlide.pause();
                    panelSlide.start('margin-left', toIncrement);
                    // fix pagination
                    panelPage.getFirst('.current').removeClass('current').getPrevious('li').addClass('current');
                    // hide buttons if needed
                    showButtons();
                }
            });

            next.addEvent('click', function() {
                if(toIncrement > maxRightIncrement) {
                    prev.show();
                    toIncrement -= increment;
                    panelSlide.pause();
                    panelSlide.start('margin-left', toIncrement);
                    // fix pagination
                    panelPage.getFirst('.current').removeClass('current').getNext('li').addClass('current');
                    // hide buttons if needed
                    showButtons();
                }
            });

            // FIXME: DRY this!
            panelPage.getChildren("li").addEvent('click', function() {
                // add pagination events
                if(toIncrement < 0) {
                    next.show();
                    toIncrement += increment;
                    panelSlide.pause();
                    panelSlide.start('margin-left', toIncrement);
                    // fix pagination
                    panelPage.getFirst('.current').removeClass('current').getPrevious('li').addClass('current');
                    // hide buttons if needed
                    showButtons();
                }
                else if(toIncrement > maxRightIncrement) {
                    prev.show();
                    toIncrement -= increment;
                    panelSlide.pause();
                    panelSlide.start('margin-left', toIncrement);
                    // fix pagination
                    panelPage.getFirst('.current').removeClass('current').getNext('li').addClass('current');
                    // hide buttons if needed
                    showButtons();
                }
            });

        } // end of if next

        // search-filter to filter the components
        var searchTerm = $('search-term');

        if (searchTerm) {
            var myFilter = new ElementFilter('search-term', '#panel-list li a', {
                trigger: 'keyup',
                cache: false,
                onShow: function(element) {
                    element.show();
                    /*element.set('morph',{
                        onComplete: function() {
                            element.setStyle('background-color','#fff');
                        }
                    });
                    element.morph({'background-color':'#a5faa9'});*/
                },
                onHide: function(element) {
                    element.hide();
                    /*element.set('morph',{
                        onComplete: function() {
                            element.setStyle('background-color','#fff');
                        }
                    });
                    element.morph({'background-color':'#fac3a5'});*/
                },
                onComplete: function(element) {
                    console.log(element);
                    //showButtons();
                }
            });
        }
        var extra = $('more');
        var extraLists = $('list-content');
        var openPanel = $('panel-tab');
        var listWrapper = $('list-wrapper');

        if (!extra.hasClass('disabled') && !openPanel.hasClass('disabled'))
        {
            // open the panel slide
            openPanel.addEvents({
                'click': function(){
                    panel.toggle();
                },
                'outerClick' : function(){
                    //panel.slideOut();
                }
            });

            // change status on toggle complete
            panel.addEvent('complete', function() {
                openPanel.set('class', panelStatus[panel.open]);
            });

            // dropdown menu
            extra.addEvent('click', function(){
                //this.getParent().addClass('active');
                this.switchClass('active','inactive');
                //this.addClass('active');
                extraLists.toggle();
            });

            var hideLists = function() {
                extra.set('class','inactive');
                listWrapper.removeClass('active');
                extraLists.hide();
            }

            // turn off list when click outside
            listWrapper.addEvent('outerClick', function(){
                hideLists();
            });

            // turn off list when clicking a link
            extraLists.getElements("a").addEvent('click', function(){
                hideLists();
            });

            // slide up panel when clicking a link
            $$('#panel-list li').addEvent('click', function(){
                panel.toggle();
            });

        }  // end hasClass('disabled')
    }// end of if(tabsWrapper)

});
