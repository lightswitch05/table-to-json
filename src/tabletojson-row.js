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
