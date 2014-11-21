/**
 * tabletojson
 * jQuery plugin that reads an HTML table and returns a javascript object representing the values and columns of the table
 *
 * @author Daniel White
 * @copyright Daniel White 2014
 * @license MIT <https://github.com/lightswitch05/table-to-json/blob/master/MIT-LICENSE>
 * @link https://github.com/lightswitch05/table-to-json
 * @module tabletojson
 * @version 0.10.0
 */
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
      var value = $.trim(this.$element.text());
      if (this.$element.data('override')) {
        value = this.$element.data('override');
      } else if (this.options.allowHTML) {
        value = $.trim(this.$element.html());
      }
      return this.withColSpan(value);
    },

    withColSpan: function(value) {
      var response = value;
      if (this.$element.attr('colSpan')) {
        var colSpan = parseInt( this.$element.attr('colSpan'), 10 );
        if(colSpan && colSpan > 1){
          response = [];
          for(var index=0; index < colSpan; index++){
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

(function($) {
  'use strict';

  var TableToJSONRow = function (row, options) {
    this.$element = $(row);
    this.cells = [];
    this.options = $.extend({}, $.fn.tableToJSONRow.defaults, options);
    this.init();
  };

  TableToJSONRow.prototype = {
    constructor: TableToJSONRow,

    id: function(){
      return this.$element.attr('id') ? this.$element.attr('id') : null;
    },

    valuesWithHeadings: function(headers){
      var valuesWithHeadings = {};
      var values = this.values();
      for(var index = 0; index < values.length; index++){
        valuesWithHeadings[headers[index]] = values[index];
      }
      return valuesWithHeadings;
    },

    isEmpty: function(){
      var empty = true;
      var values = this.values();
      for(var index = 0; empty && index < values.length; index++){
        if(values[index] !== ""){
          empty = false;
        }
      }
      return empty;
    },

    values: function(){
      var cellValues = [];
      for(var index = 0; index < this.cells.length; index++){
        if(!this.ignoreColumn(index)){
          cellValues = cellValues.concat(this.cells[index].value());
        }
      }
      return cellValues;
    },

    ignoreColumn: function(index){
      if( this.options.onlyColumns ) {
        return this.options.onlyColumns.indexOf(index) < 0;
      }
      return this.options.ignoreColumns.indexOf(index) > -1;
    },

    init: function () {
      // Init Cells
      var self = this;
      this.$element.children(this.options.cellSelector).each(function(cellIndex, cell) {
        self.cells.push( $(cell).tableToJSONCell(self.options) );
      });

      //finilize init
      $.proxy(function() {
        /**
        Fired when row was initialized by `$().tableToJSON()` method.
        Please note that you should setup `init` handler **before** applying `tableToJSON`.

        @event init
        @param {Object} event event object
        @param {Object} editable TableToJSONRow instance
        **/
        this.$element.triggerHandler('init', this);
      }, this);
    }
  };

  // Initilize row
  $.fn.tableToJSONRow = function (options) {
    return new TableToJSONRow(this, options);
  };

  $.fn.tableToJSONRow.defaults = {
    /**
    Array of column indexes to include, all other columns are ignored. This takes presidence over ignoreColumns when provided.

    @type Array
    @default null
    **/
    onlyColumns: null,

    /**
    Array of column indexes to ignore.

    @type Array
    @default []
    **/
    ignoreColumns: [],
    cellSelector: 'td,th'
  };
})(jQuery);

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
        ($row.$element.data('ignore') && $row.$element.data('ignore') !== 'false') ||
        (this.options.ignoreHiddenRows && !$row.$element.is(':visible')) ||
        (this.options.ignoreEmptyRows && $row.isEmpty());
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
    Boolean if hidden rows should be ignored or not.

    @type boolean
    @default false
    **/
    ignoreEmptyRows: false,

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
