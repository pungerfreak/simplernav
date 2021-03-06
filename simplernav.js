/*
 * jQuery simplerNav v0.2 - jQuery plugin
 * Copyright (c) 2011 Daniel Greenlaw
 * loosely based on a non-plugin script released free from
 * http://javascript-array.com/scripts/jquery_simple_drop_down_menu/
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 */

(function($) {
  $.fn.simplerNav = function(options) {
    options = $.extend({}, $.fn.simplerNav.defaults, options);

    return this.each(function() {
      $$ = $(this);
      var close,item;

      // Currently this navigation will only support one level of menus and we use the :not()
      // selector to keep it off of any menus beyond the top level level.
      $$.find('li:not(li li)').bind('mouseover', function() {
        close_navigation();
        cancel_timer();

        item = subnav(this);
        item.css({display:''});
      }).bind('mouseout', function() {
        close = window.setTimeout(close_navigation, options.timeout);
      });

      subnav = function(element) {
        return $(element).find('ul').first();
      }

      close_navigation = function() {
        if (item) {
          item.css({display:'none'});
        }
      }

      cancel_timer = function() {
        if (close) {
          window.clearTimeout(close);
          close = null;
        }
      }
    });
  };

  $.fn.simplerNav.defaults = {
    timeout: 500
  };
})(jQuery);
