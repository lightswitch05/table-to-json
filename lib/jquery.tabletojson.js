/**
 * tabletojson
 * jQuery plugin that reads an HTML table and returns a javascript object representing the values and columns of the table
 *
 * @author Daniel White
 * @copyright Daniel White 2013
 * @license MIT <https://github.com/lightswitch05/table-to-json/blob/master/MIT-LICENSE>
 * @link https://github.com/lightswitch05/table-to-json
 * @module tabletojson
 * @version 0.6.0
 */

(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null,
      ignoreHiddenRows: true,
      headings: null
    };
    opts = $.extend(defaults, opts);

    var notNull = function(value) {
      if(value !== undefined && value !== null) {
        return true;
      }
      return false;
    };

    var ignoredColumn = function(index) {
      if( notNull(opts.onlyColumns) ) {
        return $.inArray(index, opts.onlyColumns) === -1;
      }
      return $.inArray(index, opts.ignoreColumns) !== -1;
    };

    var arraysToHash = function(keys, values) {
      var result = {};
      $.each(values, function(index, value) {
        if( index < keys.length ) {
          result[ keys[index] ] = value;
        }
      });
      return result;
    };

    var rowValues = function(row) {
      var result = [];
      $(row).children("td,th").each(function(cellIndex, cell) {
        if( !ignoredColumn(cellIndex) ) {
          var override = $(cell).data("override");
          var value = $.trim($(cell).text());
          result[ result.length ] = notNull(override) ? override : value;
        }
      });
      return result;
    };

    var getHeadings = function(table) {
      var firstRow = table.find("tr:first").first();
      return notNull(opts.headings) ? opts.headings : rowValues(firstRow);
    };

    var construct = function(table, headings) {
      var result = [];
      table.children("tbody,*").children("tr").each(function(rowIndex, row) {
        if( rowIndex !== 0 || notNull(opts.headings) ) {
          if( $(row).is(":visible") || !opts.ignoreHiddenRows ) {
            result[result.length] = arraysToHash(headings, rowValues(row));
          }
        }
      });
      return result;
    };

    // Run
    var headings = getHeadings(this);
    return construct(this, headings);
  };
})( jQuery );