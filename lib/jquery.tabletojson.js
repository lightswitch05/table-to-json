/**
 * tabletojson
 * jQuery plugin that reads an HTML table and returns a javascript object representing the values and columns of the table
 *
 * @author Daniel White
 * @copyright Daniel White 2013
 * @license MIT <https://github.com/lightswitch05/table-to-json/blob/master/MIT-LICENSE>
 * @link https://github.com/lightswitch05/table-to-json
 * @module tabletojson
 * @version 0.4.0
 */

(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColNum: [],
      ignoreHiddenRows: true
    };
    opts = $.extend(defaults, opts);

    // Gather headings
    var getHeadings = function(self, filter) {
      var headings = [];
      self.find(filter).each(function(colIndex, col) {
        if($.inArray(colIndex, opts.ignoreColNum) === -1) {
          if($(col).data("column-name") !== undefined && $(col).data("column-name") != null) {
            headings[colIndex] = $(col).data("column-name");
          } else {
            headings[colIndex] = $.trim($(col).text());
          }
        } else {
          headings[colIndex] = null;
        }
      });
      return headings;
    };
    
    var getValues = function(self, headings, treatFirstRowAsHeadings) {
      var values = [];
      self.children("tbody").children("tr:has(td)")
      .filter(function(index){
        // Only get rows with values, no headings
        return $(this).children("th").length === 0;
      }).each(function(rowIndex, row) {
        if( !treatFirstRowAsHeadings || rowIndex !== 0) {
          if( $(row).is(':visible') || !opts.ignoreHiddenRows ) {
            values[values.length] = {};
            $(row).children("td").each(function(colIndex, col) {
              if( headings[colIndex] !== undefined && headings[colIndex] !== null){
                if($(col).data("cell-value") !== undefined && $(col).data("cell-value") !== null) {
                  values[values.length - 1][ headings[colIndex] ] = $(col).data("cell-value");
                } else {
                  values[values.length - 1][ headings[colIndex] ] = $.trim($(col).text());
                }
              }
            });
          }
        }
      });
      return values;
    };

    // Run
    var treatFirstRowAsHeadings = false;
    var headings = getHeadings(this, "tr:first > th");
    if( headings.length === 0 ) {
      treatFirstRowAsHeadings = true;
      headings = getHeadings(this, "tr:first > td");
    }
    return getValues(this, headings, treatFirstRowAsHeadings);
  };
})( jQuery );

