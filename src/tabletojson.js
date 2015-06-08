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
      var spannedCells, cell;
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
      var self = this, rowSpans = [], newRow = null, span = null;
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
