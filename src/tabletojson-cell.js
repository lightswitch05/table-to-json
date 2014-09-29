(function($) {
  'use strict';

  var TableToJSONCell = function (cell, options) {
    this.$element = $(cell);
    this.options = $.extend({}, $.fn.tableToJSONCell.defaults, options);
    this.init();
  };

  TableToJSONCell.prototype = {
    constructor: TableToJSONCell,

    value: function() {
      var value;
      var override = this.$element.data('override');
      if ( this.options.allowHTML ) {
        value = $.trim(this.$element.html());
      } else {
        value = $.trim(this.$element.text());
      }
      return override ? override : value;
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

  // Initilize cell
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
