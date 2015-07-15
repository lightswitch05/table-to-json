(function($) {
  'use strict';

  var TableToJSONCell = function (cell, options) {
    this.$element = $(cell);
    this.cachedRowSpan = null;
    this.options = $.extend({}, $.fn.tableToJSONCell.defaults, options);
    this.init();
  };

  TableToJSONCell.prototype = {
    constructor: TableToJSONCell,

    value: function() {
      var value = $.trim(this.$element.text());
      if (this.$element.data('override')) {
        value = this.$element.data('override');
      } else if (this.options.allowHTML) {
        value = $.trim(this.$element.html());
      }
      return this.withColSpan(value);
    },

    colSpan: function() {
      var span = 1;
      if (this.$element.attr('colSpan')) {
        span = parseInt( this.$element.attr('colSpan'), 10 );
      }
      return span;
    },

    rowSpan: function(rowSpan) {
      if(arguments.length === 1){
        this.cachedRowSpan = rowSpan;
      } else if (!this.cachedRowSpan) {
        this.cachedRowSpan = 1;
        if (this.$element.attr('rowSpan')) {
          this.cachedRowSpan = parseInt( this.$element.attr('rowSpan'), 10 );
        }
      }
      return this.cachedRowSpan;
    },

    withColSpan: function(value) {
      var response = value;
      if (this.$element.attr('colSpan')) {
        var span = this.colSpan();
        if(span > 1){
          response = [];
          for(var index=0; index < span; index++){
            response.push(value);
          }
        }
      }
      return response;
    },

    init: function () {
      $.proxy(function() {
        /**
        Fired when element was initialized by `$().tableToJSON()` method.
        Please note that you should setup `init` handler **before** applying `tableToJSON`.

        @event init
        @param {Object} event event object
        @param {Object} editable TableToJSONCell instance
        **/
        this.$element.triggerHandler('init', this);
      }, this);
    }
  };

  // Initialize cell
  $.fn.tableToJSONCell = function (options) {
    return new TableToJSONCell(this, options);
  };

  $.fn.tableToJSONCell.defaults = {
    /**
    Boolean if HTML tags in table cells should be preserved.

    @type boolean
    @default false
    **/
    allowHTML: false
  };
})(jQuery);
