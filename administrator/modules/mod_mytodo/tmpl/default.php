<?php
/**
 * @version     0.2
 * @package     Minima
 * @subpackage  mod_mytodo
 * @author      Marco Barbosa
 * @copyright   Copyright (C) 2010 Webnific. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

// No direct access.
defined('_JEXEC') or die;

?>

<script>

    var myLocalStorage = new Class({

        /**
         * initialize
         * runs when class is instanciated
         * @return
         */
        initialize: function() {
            if (typeof(localStorage) == 'undefined' ) {
                alert('Your browser does not support HTML5 localStorage. Try upgrading.');
                return null;
            } else {
                //localStorage.clear();
                // dom variables
                this.todo = $('todo');
                this.item = $('todo-item');
                // set if empty
                if (!localStorage.getItem("todo")) localStorage.setItem("todo", "");
                if (!localStorage.getItem("todoSelected")) localStorage.setItem("todoSelected", "");
                // getters
                this.todoList = localStorage.getItem("todo").split(";");
                this.selectedList = localStorage.getItem("todoSelected").split(";");
            }
        },

        /**
         * add
         * takes data from the field and stores it in localStorage
         * @return
         */
        add: function() {
            try {
                if(this.item.value) {
                    // save item
                    this.todoList.push(this.item.value);
                    localStorage.setItem( "todo", this.todoList.join(";") );
                    this.render(this.item.value, this.todoList.length-1);
                }
            } catch (e) {
                alert(e);
                //if (e == QUOTA_EXCEEDED_ERR) alert('Quota exceeded!');
            }
        },

        /**
         * remove
         * remove data from localStorage of a given key
         * @return
         */
        remove: function(_key) {
            this.todoList.splice(_key,1);
            localStorage.setItem( "todo", this.todoList.join(";") );

            this.selectedList.splice(_key,1);
            localStorage.setItem( "todoSelected", this.selectedList.join(";") );

            $(_key).getParent("li").set("tween", {onComplete: function() { this.element.dispose(); }}).fade(0);
            console.log(localStorage);
        },

        /**
         * selected
         * saves the item as selected
         * @return
         */
        toggleSelected: function(_item) {
            // is it inside the todoSelected already?
            if ( this.selectedList.contains(_item.toString()) ) {
                // it's already there, remove it
                this.selectedList.erase(_item);
            } else {
                // it's not there, add it
                this.selectedList.include(_item.toString());
            }
            localStorage.setItem("todoSelected",this.selectedList.join(";"));
        },

        /**
         * render
         * renders the item with a specific key to the list
         * @return
         */
        render: function(_item, _key) {
                var _this = this;
                var spanClass = (this.selectedList.contains(_item)) ? 'checked' : '';
                // create elements for list
                var li = new Element("li", {
                    events: {
                        click: function() {
                            var span = this.getFirst("span");
                            if (span) {
                                _this.toggleSelected(_item);
                                span.toggleClass("checked");
                            }
                        }
                    }
                });
                var span = new Element("span", {
                    html : _item,
                    'id' : _key,
                    'class' : spanClass
                });
                var del = new Element("a", {
                    html : 'x',
                    'class' : 'deleteItem',
                    events: {
                        click: function(){
                            _this.remove( this.getPrevious("span").get("id") );
                        }
                    }
                });
                // add the new item to the list
                this.todo.grab( li.grab(span).grab(del) );
        },

        /**
         * showList
         * makes it render the whole list
         * @return
         */
        showList: function() {
            for (var i = 1; i < this.todoList.length; i++) this.render(this.todoList[i],i);
        }

    });

    window.addEvent('domready', function() {

        var objStorage = new myLocalStorage();

        objStorage.showList();

        objStorage.item.addEvents({
            'click' : function() {
                this.value = "";
            },
            'keypress' : function(e) {
                if (e.key == 'enter'){ objStorage.add(); this.value=""; }
            }
        });

    });

</script>

<input type="text" id="todo-item" name="todo-item" value="<?php echo JText::_('MOD_MYTODO_ADD'); ?>" />
<ol id="todo"></ol>
