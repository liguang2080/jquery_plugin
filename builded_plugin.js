/* Plugin list: 
   * jquery.center.js
   * jquery.hintup.js
   * jquery.metadata.js
   * jquery.mysorter.js
   * jquery.template.js
*/





/**********jquery.center.js**********/
(function($){
	
	$.fn.set_center = function() {
	  return this.each(function() {
	    var viewportWidth = $(window).width(), viewportHeight = $(window).height();
      var scrollTop = $(document).scrollTop(), scrollLeft = $(document).scrollLeft();
      $(this).css({position: "absolute", left: viewportWidth/2 + scrollLeft, top: viewportHeight/2 + scrollTop});
    });
	};

})(jQuery);





/**********jquery.hintup.js**********/
(function($){
	
	$.hintup = function() {
	  $("input.hintup").each(function() {
	    $(this)
	      .val($(this).attr("title"))
	      .focus(function() {$(this).val("");})
        .blur(function() {$(this).val($(this).attr("title"))});
    });
	};

})(jQuery);





/**********jquery.metadata.js**********/
/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, J�örn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.metadata.js 3640 2007-10-11 18:34:38Z pmclanahan $
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
  metadata : {
    defaults : {
      type: 'class',
      name: 'metadata',
      cre: /({.*})/,
      single: 'metadata'
    },
    setType: function( type, name ){
      this.defaults.type = type;
      this.defaults.name = name;
    },
    get: function( elem, opts ){
      var settings = $.extend({},this.defaults,opts);
      // check for empty string in single property
      if ( !settings.single.length ) settings.single = 'metadata';
      
      var data = $.data(elem, settings.single);
      // returned cached data if it already exists
      if ( data ) return data;
      
      data = "{}";
      
      var getData = function(data) {
        if(typeof data != "string") return data;
        
        if( data.indexOf('{') < 0 ) {
          data = eval("(" + data + ")");
        }
      }
      
      var getObject = function(data) {
        if(typeof data != "string") return data;
        
        data = eval("(" + data + ")");
        return data;
      }
      
      if ( settings.type == "html5" ) {
        var object = {};
        $( elem.attributes ).each(function() {
          var name = this.nodeName;
          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
          else return true;
          object[name] = getObject(this.nodeValue);
        });
      } else {
        if ( settings.type == "class" ) {
          var m = settings.cre.exec( elem.className );
          if ( m )
            data = m[1];
        } else if ( settings.type == "elem" ) {
          if( !elem.getElementsByTagName ) return;
          var e = elem.getElementsByTagName(settings.name);
          if ( e.length )
            data = $.trim(e[0].innerHTML);
        } else if ( elem.getAttribute != undefined ) {
          var attr = elem.getAttribute( settings.name );
          if ( attr )
            data = attr;
        }
        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
      }
      
      $.data( elem, settings.single, object );
      return object;
    }
  }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
  return $.metadata.get( this[0], opts );
};

})(jQuery);





/**********jquery.mysorter.js**********/
(function($){
	
	$.fn.sortable = function(opt) {
	  options = $.extend({colHint: false}, opt);
	  return this.each(function() {
          var $table = $(this);
          $('th', $table).each(function(column) {
               var $header = $(this);
               //代表可以排序
               if ($header.metadata().sortType) {
                  //按字母顺序进行排序
                  $header
                      .addClass('clickable')
                      .click(function() {
                          $header.siblings().removeClass('asc').removeClass('desc');
                          $header.hasClass('asc') ? 
                            $header.removeClass('asc').addClass('desc'): 
                            $header.removeClass('desc').addClass('asc');
                          var rows = $table.find('tbody > tr').get();

                          if ($header.metadata().sortType == "alpha") {
                            rows.sort(function(a, b) {
                                var keyA = $(a).children('td').eq(column).text().toUpperCase();
                                var keyB = $(b).children('td').eq(column).text().toUpperCase();

                                if (keyA > keyB) {
                                    return ($header.hasClass('asc')) ? 1 : -1;
                                  }
                                if (keyA < keyB) {
                                  return ($header.hasClass('asc')) ? -1 : 1;
                                }
                                return 0;                       
                            });
                          }
                          
                          if ($header.metadata().sortType == "numeric") {
                            rows.sort(function(a, b) {
                                var keyA = parseFloat($(a).children('td').eq(column).text());
                                var keyB = parseFloat($(b).children('td').eq(column).text());

                                if (keyA > keyB) {
                                    return ($header.hasClass('asc')) ? 1 : -1;
                                  }
                                if (keyA < keyB) {
                                  return ($header.hasClass('asc')) ? -1 : 1;
                                }
                                return 0;                       
                            });
                          }
                          
                          if (options.colHint) {
                            $(rows).each(function  () {
                              $(this).children('td').removeClass("sort_highlight");
                              $(this).children('td').eq(column).addClass("sort_highlight");
                            });
                          }

                          $.each(rows, function(index, row) {
                              $table.find('tbody').append(row);
                          });
                      });
               }
          });
	    
    });
	};
})(jQuery);





/**********jquery.template.js**********/
/**
 * jQuery Templates
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Written by: Stan Lemon <stanlemon@mac.com>
 *
 * Based off of the Ext.Template library, available at:
 * http://www.extjs.com
 *
 * This library provides basic templating functionality, allowing for macro-based
 * templates within jQuery.
 *
 * Basic Usage:
 *
 * var t = $.template('<div id="foo">Hello ${name}, how are you ${question}?  I am ${me:substr(0,10)}</div>');
 *
 * $(selector).append( t , {
 *     name: 'Stan',
 *     question: 'feeling',
 *     me: 'doing quite well myself, thank you very much!'
 * });
 *
 * Requires: jQuery 1.2+
 *
 *
 * @todo    Add callbacks to the DOM manipulation methods, so that events can be bound
 *          to template nodes after creation.
 */
(function($){
	
	/**
	 * Create a New Template
	 */
	$.template = function(html, options) {
		return new $.template.instance(html, options);
	};

	/**
	 * Template constructor - Creates a new template instance.
	 *
	 * @param 	html 	The string of HTML to be used for the template.
	 * @param 	options An object of configurable options.  Currently
	 * 			you can toggle compile as a boolean value and set a custom
	 *          template regular expression on the property regx by
	 *          specifying the key of the regx to use from the regx object.
	 */
	$.template.instance = function(html, options) {
        // If a custom regular expression has been set, grab it from the regx object
        if ( options && options['regx'] ) options.regx = this.regx[ options.regx ];

		this.options = $.extend({
			compile: 		false,
			regx:           this.regx.standard
		}, options || {});

		this.html = html;

		if (this.options.compile) {
			this.compile();   
		}
		this.isTemplate = true;
	};

	/**
	 * Regular Expression for Finding Variables
	 *
	 * The default pattern looks for variables in JSP style, the form of: ${variable}
	 * There are also regular expressions available for ext-style variables and
	 * jTemplate style variables.
	 *
	 * You can add your own regular expressions for variable ussage by doing.
	 * $.extend({ $.template.re , {
	 *     myvartype: /...../g
	 * }
	 *
	 * Then when creating a template do:
	 * var t = $.template("<div>...</div>", { regx: 'myvartype' });
	 */
	$.template.regx = $.template.instance.prototype.regx = {
	    jsp:        /\$\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        ext:        /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,
        jtemplates: /\{\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}\}/g
	};
	
	/**
	 * Set the standard regular expression to be used.
	 */
	$.template.regx.standard = $.template.regx.jsp;
	
	/**
	 * Variable Helper Methods
	 *
	 * This is a collection of methods which can be used within the variable syntax, ie:
	 * ${variable:substr(0,30)} Which would only print a substring, 30 characters in length
	 * begining at the first character for the variable named "variable".
	 *
	 * A basic substring helper is provided as an example of how you can define helpers.
	 * To add more helpers simply do:
	 * $.extend( $.template.helpers , {
	 *	 sampleHelper: function() { ... }	
	 * });
	 */
	$.template.helpers = $.template.instance.prototype.helpers = {
		substr : function(value, start, length){
			return String(value).substr(start, length);
		}
	};


	/**
	 * Template Instance Methods
	 */
	$.extend( $.template.instance.prototype, {
		
		/**
		 * Apply Values to a Template
		 *
		 * This is the macro-work horse of the library, it receives an object
		 * and the properties of that objects are assigned to the template, where
		 * the variables in the template represent keys within the object itself.
		 *
		 * @param 	values 	An object of properties mapped to template variables
		 */
		apply: function(values) {
			if (this.options.compile) {
				return this.compiled(values);
			} else {
				var tpl = this;
				var fm = this.helpers;

				var fn = function(m, name, format, args) {
					if (format) {
						if (format.substr(0, 5) == "this."){
							return tpl.call(format.substr(5), values[name], values);
						} else {
							if (args) {
								// quoted values are required for strings in compiled templates, 
								// but for non compiled we need to strip them
								// quoted reversed for jsmin
								var re = /^\s*['"](.*)["']\s*$/;
								args = args.split(',');

								for(var i = 0, len = args.length; i < len; i++) {
									args[i] = args[i].replace(re, "$1");
								}
								args = [values[name]].concat(args);
							} else {
								args = [values[name]];
							}

							return fm[format].apply(fm, args);
						}
					} else {
						return values[name] !== undefined ? values[name] : "";
					}
				};

				return this.html.replace(this.options.regx, fn);
			}
		},

		/**
		 * Compile a template for speedier usage
		 */
		compile: function() {
			var sep = $.browser.mozilla ? "+" : ",";
			var fm = this.helpers;

			var fn = function(m, name, format, args){
				if (format) {
					args = args ? ',' + args : "";

					if (format.substr(0, 5) != "this.") {
						format = "fm." + format + '(';
					} else {
						format = 'this.call("'+ format.substr(5) + '", ';
						args = ", values";
					}
				} else {
					args= ''; format = "(values['" + name + "'] == undefined ? '' : ";
				}
				return "'"+ sep + format + "values['" + name + "']" + args + ")"+sep+"'";
			};

			var body;

			if ($.browser.mozilla) {
				body = "this.compiled = function(values){ return '" +
					   this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn) +
						"';};";
			} else {
				body = ["this.compiled = function(values){ return ['"];
				body.push(this.html.replace(/\\/g, '\\\\').replace(/(\r\n|\n)/g, '\\n').replace(/'/g, "\\'").replace(this.options.regx, fn));
				body.push("'].join('');};");
				body = body.join('');
			}
			eval(body);
			return this;
		}
	});


	/**
	 * Save a reference in this local scope to the original methods which we're 
	 * going to overload.
	 **/
	var $_old = {
	    domManip: $.fn.domManip,
	    text: $.fn.text,
	    html: $.fn.html,
	    replaceWith: $.fn.replaceWith
	};

	/**
	 * Overwrite the domManip method so that we can use things like append() by passing a 
	 * template object and macro parameters.
	 */
	$.fn.domManip = function( args, table, reverse, callback ) {
		if (args[0].isTemplate) {
			// Apply the template and it's arguments...
			args[0] = args[0].apply( args[1] );
			// Get rid of the arguements, we don't want to pass them on
			delete args[1];
		}

		// Call the original method
		var r = $_old.domManip.apply(this, arguments);

		return r;
	};

    /**
     * Overwrite the html() method
     */
	$.fn.html = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.html.apply(this, [value]);

		return r;
	};
	
	$.fn.replaceWith = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.replaceWith.apply(this, [value]);

		return r;
	};
  
	/**
	 * Overwrite the text() method
	 */
	$.fn.text = function( value , o ) {
	    if (value && value.isTemplate) var value = value.apply( o );

		var r = $_old.text.apply(this, [value]);

		return r;
	};

})(jQuery);
