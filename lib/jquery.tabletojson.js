/**
 * table-to-json
 * jQuery plugin that reads an HTML table and returns a javascript object representing the values and columns of the table
 *
 * @author Daniel White
 * @copyright Daniel White 2020
 * @license MIT <https://github.com/lightswitch05/table-to-json/blob/master/MIT-LICENSE>
 * @link https://github.com/lightswitch05/table-to-json
 * @module table-to-json
 * @version 0.13.1
 */
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
        if(values[index] !== ''){
          empty = false;
        }
      }
      return empty;
    },

    cell: function(index){
      if(index < this.cells.length){
        return this.cells[index];
      } else {
        return null;
      }
    },

    insert: function(index, cell){
      this.cells.splice(index, 0, cell);
    },

    getRowSpans: function(spans){
      var span, rows = [], cell;
      for(var cellIndex = 0; cellIndex < this.cells.length; cellIndex++){
        rows = [];
        cell = this.cells[cellIndex];
        if(cell){
          span = cell.rowSpan();
          while(span > 1){
            rows.push(cell);
            span--;
          }
          cell.rowSpan(1);
        }
        if(rows.length > 0){
          spans[cellIndex] = rows;
        }
      }
      //console.log("spans" + JSON.stringify(spans));
      return spans;
    },

    insertRowSpans: function(spans){
      for(var cellIndex = 0; cellIndex < spans.length; cellIndex++) {
        if (spans[cellIndex] && spans[cellIndex].length > 0) {
          var spannedCell = spans[cellIndex].splice(0, 1)[0];
          this.insert(cellIndex, spannedCell);
        }
      }
      return spans;
    },

    rowSpans: function(){
      var spans = [], span, rows = [], cell;
      for(var cellIndex = 0; cellIndex < this.cells.length; cellIndex++){
        rows = [];
        cell = this.cells[cellIndex];
        span = cell.rowSpan();
        while(span > 1){
          rows.push(cell);
          span--;
        }
        cell.rowSpan(1);
        if(rows.length > 0){
          spans[cellIndex] = rows;
        }
      }
      //console.log("spans" + JSON.stringify(spans));
      return spans;
    },

    values: function(){
      var cellValues = [], value = null, colSpanOffset = 0;
      for(var index = 0; index < this.cells.length; index++){
        value = this.cells[index].value();

        if (this.cells[index].colSpan() === 1) {
          // simple case, either ignore it or not
          if(!this.ignoreColumn(colSpanOffset)){
            cellValues = cellValues.concat(value);
          }
          colSpanOffset++;
        } else {
          // this cell has a colSpan, ensure each
          // value match ignored columns
          for (var valuesIndex = 0; valuesIndex < value.length; valuesIndex++) {
            if (!this.ignoreColumn(colSpanOffset)) {
              cellValues = cellValues.concat(value[valuesIndex]);
            }
            colSpanOffset++;
          }
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

      // Finalize init
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

  // Initialize row
  $.fn.tableToJSONRow = function (options) {
    return new TableToJSONRow(this, options);
  };

  $.fn.tableToJSONRow.defaults = {
    /**
    Array of column indexes to include, all other columns are ignored. This takes precedence over ignoreColumns when provided.

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
      return (
        this.options.ignoreRows && this.options.ignoreRows.indexOf(index) > -1) ||
        ($row.$element.data('ignore') && $row.$element.data('ignore') !== 'false') ||
        (this.options.ignoreHiddenRows && !$row.$element.is(':visible')) ||
        (this.options.ignoreEmptyRows && $row.isEmpty());
    },

    addRow: function($row, rowSpans) {
      $row.insertRowSpans(rowSpans);
      this.rows.push($row);
      return $row.getRowSpans(rowSpans);

      /*
      if(rowSpans.length === 0){
        // no previous row spans to worry about
        this.rows.push($row);
      } else {
        for(var startingCell=0; startingCell < rowSpans.length; startingCell++){
          spannedCells = rowSpans[startingCell];
          if(spannedCells && spannedCells.length > 0){
            cell = spannedCells.splice(0, 1);
            $row.insert(startingCell, cell);
          }
          if(spannedCells.length > 0){
            rowSpans[startingCell] = spannedCells;
          } else {
            rowSpans.splice(startingCell, 1);
          }
        }
        rowSpans.shift();
      }
      return rowSpans;*/
    },

    init: function () {
      // Init Rows
      var self = this, rowSpans = [], newRow = null;
      this.$element.children(this.options.rowParentSelector).children(this.options.rowSelector).each(function(rowIndex, row) {
        newRow = $(row).tableToJSONRow(self.options);
        rowSpans = self.addRow( newRow, rowSpans );
        //span = newRow.rowSpans();
        //if(span.length > 0){
        //  rowSpans.push(span);
       // }
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

  // Initialize
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
