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
      return spans;
    },

    values: function(options){
      var runOptions = $.extend({}, this.options, options);
      var cellValues = [], value = null, colSpanOffset = 0;
      for(var index = 0; index < this.cells.length; index++){
        value = this.cells[index].value(runOptions);

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
        self.cells.push( $(cell).tableToJSONCell(cellIndex, self.options) );
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
