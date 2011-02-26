/** 
 * @package     Minima
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Marco Barbosa. All rights reserved.
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

// ElementFilter by David Walsh (http://davidwalsh.name/plugin-element-filter)
var
	ElementFilter=new Class({Implements:[Options,Events],options:{cache:true,caseSensitive:false,ignoreKeys:[13,27,32,37,38,39,40],matchAnywhere:true,property:"text",trigger:"keyup",onStart:$empty,onShow:$empty,onHide:$empty,onComplete:$empty},initialize:function(c,b,a){this.setOptions(a);this.observeElement=document.id(c);this.elements=$$(b);this.matches=this.elements;this.misses=[];this.listen();},listen:function(){this.observeElement.addEvent(this.options.trigger,function(a){if(this.observeElement.value.length){if(!this.options.ignoreKeys.contains(a.code)){this.fireEvent("start");this.findMatches(this.options.cache?this.matches:this.elements);this.fireEvent("complete");}}else{this.findMatches(this.elements,false);}}.bind(this));},findMatches:function(f,b){var e=this.observeElement.value;var a=this.options.matchAnywhere?e:"^"+e;var g=this.options.caseSensitive?"":"i";var c=new RegExp(a,g);var d=[];f.each(function(i){var h=(b==undefined?c.test(i.get(this.options.property)):b);if(h){if(!i.retrieve("showing")){this.fireEvent("show",[i]);}d.push(i);i.store("showing",true);}else{if(i.retrieve("showing")){this.fireEvent("hide",[i]);}i.store("showing",false);}return true;}.bind(this));return d;}}),
	// MyPanelClass by Henrik Hussfelt, Marco Barbosa
	MyPanelClass=new Class({Implements:[Options],panelStatus:{"true":"active","false":"inactive"},panel:null,options:{prev:"",next:"",panelList:"",panelPage:"",panelWrapper:"",toIncrement:0,increment:900},maxRightIncrement:null,panelSlide:null,numberOfExtensions:null,initialize:function(a){this.setOptions(a);this.panel=new Fx.Slide.Mine(this.options.panelWrapper,{mode:"vertical",transition:Fx.Transitions.Pow.easeOut}).hide();if(this.options.next){this.panelSlide=new Fx.Tween(this.options.panelList,{duration:500,transition:"back:in:out"});this.numberOfExtensions=this.options.panelList.getChildren("li").length;this.options.panelList.setStyle("width",Math.round(this.numberOfExtensions/9)*this.options.increment);this.maxRightIncrement=-Math.ceil(this.options.panelPage.getChildren().length*this.options.increment-this.options.increment);this.showButtons()}},helloWorld:function(){alert("cool")},doPrevious:function(){if(this.options.toIncrement<0){this.options.next.show();this.options.toIncrement+=this.options.increment;this.panelSlide.pause();this.panelSlide.start("margin-left",this.options.toIncrement);this.options.panelPage.getFirst(".current").removeClass("current").getPrevious("li").addClass("current");this.showButtons()}},doNext:function(){if(this.options.toIncrement>this.maxRightIncrement){this.options.prev.show();this.options.toIncrement-=this.options.increment;this.panelSlide.pause();this.panelSlide.start("margin-left",this.options.toIncrement);this.options.panelPage.getFirst(".current").removeClass("current").getNext("li").addClass("current");this.showButtons()}},changeToPage:function(b){var a=b.id.substr("panel-pagination-".length);this.panelSlide.pause();this.options.toIncrement=Math.ceil(0-this.options.increment*a);this.panelSlide.start("margin-left",this.options.toIncrement);this.options.panelPage.getFirst(".current").removeClass("current");b.addClass("current");this.showButtons()},showButtons:function(){if(this.options.toIncrement==0){this.options.prev.hide()}else{this.options.prev.show()}if(this.options.toIncrement==this.maxRightIncrement){this.options.next.hide()}else{this.options.next.show()}}}),
	// MinimaTabsClass by Henrik Hussfelt, Marco Barbosa
	MinimaTabsClass=new Class({Implements:[Options],options:{},elements:{tabs:null,content:null},initialize:function(a,b){this.setOptions(a);this.elements=b},showFirst:function(){this.elements.content.pick().removeClass("hide")},hideAllContent:function(){this.elements.content.addClass("hide")},addTabsAction:function(){this.elements.tabs.each(function(b,a){b.addEvents({click:function(c){c.stop();this.elements.tabs.removeClass("active");this.elements.tabs[a].addClass("active");this.elements.content.addClass("hide");this.elements.content[a].removeClass("hide")}.bind(this)})}.bind(this))}}),
	// ScrollSpy by David Walsh (http://davidwalsh.name/js/scrollspy)
	ScrollSpy=new Class({Implements:[Options,Events],options:{container:window,max:0,min:0,mode:"vertical"},initialize:function(a){this.setOptions(a);this.container=document.id(this.options.container);this.enters=this.leaves=0;this.inside=false;this.listener=function(d){var b=this.container.getScroll(),c=b[this.options.mode=="vertical"?"y":"x"];if(c>=this.options.min&&(this.options.max==0||c<=this.options.max)){if(!this.inside){this.inside=true;this.enters++;this.fireEvent("enter",[b,this.enters,d])}this.fireEvent("tick",[b,this.inside,this.enters,this.leaves,d])}else{if(this.inside){this.inside=false;this.leaves++;this.fireEvent("leave",[b,this.leaves,d])}}this.fireEvent("scroll",[b,this.inside,this.enters,this.leaves,d])};this.addListener()},start:function(){this.container.addEvent("scroll",this.listener.bind(this))},stop:function(){this.container.removeEvent("scroll",this.listener.bind(this))},addListener:function(){this.start()}});

window.addEvent('load', function() {

});

window.addEvent('domready', function() {

    // Iphone checkboxes
    (function(a){this.IPhoneCheckboxes=new Class({Implements:[Options],options:{checkedLabel:"ON",uncheckedLabel:"OFF",background:"#fff",containerClass:"iPhoneCheckContainer",labelOnClass:"iPhoneCheckLabelOn",labelOffClass:"iPhoneCheckLabelOff",handleClass:"iPhoneCheckHandle",handleBGClass:"iPhoneCheckHandleBG",handleSliderClass:"iPhoneCheckHandleSlider",elements:"input[type=checkbox].check"},initialize:function(b){this.setOptions(b);this.elements=$$(this.options.elements);this.elements.each(function(c){this.observe(c)},this)},observe:function(e){e.set("opacity",0);var d=new Element("div",{"class":this.options.containerClass}).inject(e.getParent());e.inject(d);var g=new Element("div",{"class":this.options.handleClass}).inject(d);var c=new Element("div",{"class":this.options.handleBGClass,style:this.options.background}).inject(g);var i=new Element("div",{"class":this.options.handleSliderClass}).inject(g);var b=new Element("label",{"class":this.options.labelOffClass,text:this.options.uncheckedLabel}).inject(d);var f=new Element("label",{"class":this.options.labelOnClass,text:this.options.checkedLabel}).inject(d);var h=d.getSize().x-39;e.offFx=new Fx.Tween(b,{property:"opacity",duration:200});e.onFx=new Fx.Tween(f,{property:"opacity",duration:200});d.addEvent("mouseup",function(){var l=!e.checked;var j=(l?h:0);var k=(l?34:0);c.hide();new Fx.Tween(g,{duration:100,property:"left",onComplete:function(){c.setStyle("left",k).show()}}).start(j);if(l){e.offFx.start(0);e.onFx.start(1)}else{e.offFx.start(1);e.onFx.start(0)}e.set("checked",l)});if(e.checked){b.set("opacity",0);f.set("opacity",1);g.setStyle("left",h);c.setStyle("left",34)}else{f.set("opacity",0);c.setStyle("left",0)}}})})(document.id);

    // instanciate
    //var chx = new IPhoneCheckboxes();

    // ------------------------------- 

    // get the language strings
    var language = MooTools.lang.get('Minima');

    // DOM variables    
    var toolbarElements = $$('.toolbar-list li a'); // save all anchors first
    var toolbar = $('toolbar');
    var bulkActions = new Array();
    var bulkNonActions = new Array();
    var filterBar = $('filter-bar');
    var contentTop = $('content-top');
    var topHead = $('tophead');
    var minima = $('minima');
    // ------------------------------- 

    /* TOOLBAR
     * ================================================== */
        
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

    /* FIXES
     * ============================= */
    // show back the toolbar after done fixing it
    if (toolbar) toolbar.show();

    $(document.body).addClass('ready');
    //$(document.body).removeClass('no-js');

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
    var itemForm = $('item-form');

    // fix submenu position on overrides
    if ( (subMenu && subMenu.hasClass('out')) || (subMenu && $('item-form')) )
    {
        if (itemForm) itemForm.getChildren('div').addClass('hide');
        // move the submenu to the top of content
        subMenu.inject($('content'),'top');
    }

    // fix left border on toolbar
    /*if( !subMenu && $('toolbar-box') )
    {
        //$('toolbar-box').addClass('borderLeft');
    }
    else if( $('item-form') )*/
    if (subMenu && $('item-form')) {
        // Start tabs actions, create instances of class
    	var MinimaTabs_Horizontal = new MinimaTabsClass({}, {'tabs': $$('.minimaTabs a'), 'content': itemForm.getChildren('div')}),
        	MinimaTabs_Vertical = new MinimaTabsClass({}, {'tabs': $$('#advanced-tabs a'), 'content': $('tabs').getChildren('.panelform')});

    	// Add tabs for horizontal submenu
        // Hide all content elements
        MinimaTabs_Horizontal.hideAllContent();
        // Show the first
        MinimaTabs_Horizontal.showFirst();
        // Add onClick
        MinimaTabs_Horizontal.addTabsAction();

        // Add tabs for vertical menu
        // Hide all content elements
        MinimaTabs_Vertical.hideAllContent();
        // Show the first
        MinimaTabs_Vertical.showFirst();
        // Add onClick
        MinimaTabs_Vertical.addTabsAction();
    };

    // fix padding when there's no tabs
    if ( !filterBar  && $$('.adminlist') ){ $$('.adminlist').addClass('padTop');}

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

        filterBar.show();
    } //end filter-bar

    console.log(document.getScrollSize());

    // fixed content-box header when scrolling    
    /* scrollspy instance */    
    var ss = new ScrollSpy({
        min: 200, 
        onEnter: function() {
            // we are in locked mode, must fix positioning
            //if( document.getScroll().y > 200) {
            if(document.body.hasClass('locked')) {
                contentTop.setStyle('left', (topHead.getSize().x - 1140) / 2);
            }            
            contentTop.setStyle('width', topHead.getSize().x - 40).addClass('fixed');
        },
        onLeave: function() {
            contentTop.removeClass('fixed');
            if(document.body.hasClass('locked')) {
                contentTop.setStyle('width', '100%');
            }
        }
    }); 
    
    // ------------------------------- 

    /* PANEL TAB
     * ================================================== */

    // tabs wrapper
    var tabsWrapper = $('panel-wrapper');

    if (tabsWrapper)
    {
	    // fixing wrapper bug - thanks to d_mitar
	    Fx.Slide.Mine = new Class({
	        Extends: Fx.Slide,
	        initialize: function(el, options) {
	            this.parent(el, options);
	            this.wrapper = this.element.getParent();
	        }
	    });

		// Create a MyPanel instance
		var MyPanel = new MyPanelClass({
				panelWrapper: $('panel-wrapper'),
				prev: $('prev'),
				next: $('next'),
				panelList: $('panel-list'),
				panelPage: $('panel-pagination')
		});

		// Setup click event for previous
		$('prev').addEvent('click', function() {
			MyPanel.doPrevious();
		});
		// Setup click event for previous
		$('next').addEvent('click', function() {
			MyPanel.doNext();
		});

		// Fix panel pagination
		$('panel-pagination').getChildren("li").addEvent('click', function() {
			// Send ID to changepage as this contains pagenumber
			MyPanel.changeToPage(this);
		});

        // search-filter to filter the components
        /*var searchTerm = $('search-term');

        if (searchTerm) {
            var myFilter = new ElementFilter('search-term', '#panel-list li a', {
                trigger: 'keyup',
                cache: false,
                onShow: function(element) {
                    element.show();
                    element.set('morph',{
                        onComplete: function() {
                            element.setStyle('background-color','#fff');
                        }
                    });
                    element.morph({'background-color':'#a5faa9'});
                },
                onHide: function(element) {
                    element.hide();
                    element.set('morph',{
                        onComplete: function() {
                            element.setStyle('background-color','#fff');
                        }
                    });
                    element.morph({'background-color':'#fac3a5'});
                },
                onComplete: function(element) {
                    console.log(element);
                    //showButtons();
                }
            });
        }*/

        var extra = $('more');
        var extraLists = $('list-content');
        var openPanel = $('panel-tab');
        var listWrapper = $('list-wrapper');

        // open the panel slide
        openPanel.addEvents({
            'click': function(){
        		MyPanel.panel.toggle();
            },
            'outerClick' : function(){
                //panel.slideOut();
            }
        });

        // change status on toggle complete
        MyPanel.panel.addEvent('complete', function() {
            openPanel.set('class', MyPanel.panelStatus[MyPanel.panel.open]);
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

    }// end of if(tabsWrapper)

});
