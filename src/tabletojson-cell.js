(function($) {
  'use strict';

  var TableToJSONCell = function (cell, index, options) {
    this.$element = $(cell);
    this.index = index;
    this.cachedRowSpan = null;
    this.options = $.extend({}, $.fn.tableToJSONCell.defaults, options);
    this.init();
  };

  TableToJSONCell.prototype = {
    constructor: TableToJSONCell,

    value: function(options) {
      var runOptions = $.extend({}, this.options, options);
      var value = $.trim(this.$element.text());
      var override = this.$element.attr(this.options.textDataOverride);
      if (override) {
        value = override;
      } else if (runOptions.extractor || runOptions.textExtractor) {
        return this.extractedValue();
      } else if (runOptions.allowHTML) {
        value = $.trim(this.$element.html());
      }
      return this.withColSpan(value);
    },

    extractedValue: function() {
      var extractor = this.options.extractor || this.options.textExtractor;
      var value = null;
      if ( $.isFunction(extractor) ) {
        value = extractor(this.index, this.$element);
      } else if (typeof extractor === 'object' && $.isFunction(extractor[this.index])) {
        value = extractor[this.index](this.index, this.$element);
      }
      return typeof value === 'string' ? $.trim(value) : value;
    },

    /**
     * Gets the cell's colSpan attribute.
     * @returns {number}
     */
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

    /**
     * Returns either the given value, or an array of the value for each header that owns this cell.
     * @param value
     * @returns []
     */
    withColSpan: function(value) {
      var response = value;
      if (this.$element.attr('colSpan')) {
        var span = this.colSpan();
        if(span > 1){
          response = [];
          for(var index=0; index < span; index++){
            // Dup the value for each header this cell belongs to
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
  $.fn.tableToJSONCell = function (index, options) {
    return new TableToJSONCell(this, index, options);
  };

  $.fn.tableToJSONCell.defaults = {
    /**
     * Boolean if HTML tags in table cells should be preserved.
     * @type boolean
     * @default false
     */
    allowHTML: false,

    /**
     * String of the data-* attribute name to use for the override value.
     * @type String
     * @default 'override'
     */
    textDataOverride: 'data-override',

    /**
     * Function that is used on all tbody cells to extract text from the cells.
     * Note: A value in `data-override` will prevent this function from being called.
     * @type Function|Object
     * @default null
     */
    extractor: null,

    /**
     * alias for extractor option.
     */
    textExtractor: null
  };
})(jQuery);
