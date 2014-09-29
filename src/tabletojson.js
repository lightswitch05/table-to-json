(function( $ ) {
  'use strict';

  var TableToJSON = function (table, options) {
    this.$element = $(table);
    this.rows = [];
    this.options = $.extend({}, $.fn.tableToJSON.defaults, options);
    this.init();
  };

  TableToJSON.prototype = {
    constructor: TableToJSON,

    headings: function() {
      if(this.rows.length > 0 && !this.options.headings){
        return this.rows[0].values();
      } else if (this.options.headings){
        return this.options.headings;
      } else {
        return [];
      }
    },

    values: function() {
      var rowValues = [];
      var headings = this.headings();
      var index = (this.options.headings) ? 0 : 1; // Skip first row if heading are not supplied
      for(index; index < this.rows.length; index++){
        if(!this.ignoreRow(this.rows[index], index)){
          if(this.options.includeRowId){
            var rowIdHeader = (typeof this.options.includeRowId === 'string') ? this.options.includeRowId : 'rowId';
            var cellValues = this.rows[index].valuesWithHeadings(headings);
            cellValues[rowIdHeader] = this.rows[index].id();
            rowValues.push( cellValues );
          } else {
            rowValues.push( this.rows[index].valuesWithHeadings(headings) );
          }
        }
      }
      return rowValues;
    },

    ignoreRow: function($row, index) {
      return (this.options.ignoreRows && this.options.ignoreRows.indexOf(index) > -1) ||
        (!$row.$element.is(':visible') && this.options.ignoreHiddenRows);
    },

    init: function () {
      // Init Rows
      var self = this;
      this.$element.children(this.options.rowParentSelector).children(this.options.rowSelector).each(function(rowIndex, row) {
        self.rows.push( $(row).tableToJSONRow(self.options) );
      });

      $.proxy(function() {
        /**
        Fired when element was initialized by `$().tableToJSON()` method.
        Please note that you should setup `init` handler **before** applying `tableToJSON`.

        @event init
        @param {Object} event event object
        @param {Object} editable TableToJSON instance
        **/
        this.$element.triggerHandler('init', this);
      }, this);
    }
  };

  // Initilize
  $.fn.tableToJSON = function (options) {
    var table = new TableToJSON(this, options);
    return table.values();
  };

  $.fn.tableToJSON.defaults = {
    /**
    Array of row indexes to ignore.

    @type Array
    @default []
    **/
    ignoreRows: [],

    /**
    Boolean if hidden rows should be ignored or not.

    @type boolean
    @default true
    **/
    ignoreHiddenRows: true,

    /**
    Array of column headings to use. When supplied, all table rows are treated as values (no headings row).

    @type Array
    @default null
    **/
    headings: null,

    /**
    Determines if the `id` attribute of each `<tr>` element is included in the JSON.

    @type boolean
    @default false
    **/
    includeRowId: false,

    rowParentSelector: 'tbody,*',
    rowSelector: 'tr'
  };
})( jQuery );
