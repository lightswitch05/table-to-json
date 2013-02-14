/**
  Table To JSON jQuery Plugin
  by Daniel White - developerdan.com

  Version: 0.3.0

  Copyright (c) 2013 Daniel White. Released under the MIT License.

  Feel free to contribute to this project on GitHub by
  submitting pull requests and reporting issues @
  http://github.com/lightswitch05/table-to-json
**/
(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColNum: [],
      ignoreHiddenRows: true
    };
    opts = $.extend(defaults, opts);

    // Gather headings
    var headings = new Array();
    this.find("tr > th").each(function(colIndex, col) {
      if($.inArray(colIndex, opts.ignoreColNum) == -1) {
        if($(col).data("column-name") != undefined && $(col).data("column-name") != null) {
          console.log("USING COLUMNS-VALUE" + $(col).data("column-name"));
          headings[colIndex] = $(col).data("column-name");
        } else {
          headings[colIndex] = $.trim($(col).text());
        }
      } else {
        headings[colIndex] = null;
      }
    });

    // Gather values
    var values = new Array();
    this.children("tbody").children("tr:has(td)")
    .filter(function(index){
      return $(this).children("th").length == 0
    }).each(function(rowIndex, row) {
    //this.find("this > tr:has(td):not(:has(th))").each(function(rowIndex, row) {
      if( $(row).is(':visible') || !opts.ignoreHiddenRows ) {
        values[rowIndex] = {};
        $(row).children("td").each(function(colIndex, col) {
          if( headings[colIndex] != undefined && headings[colIndex] != null){
            if($(col).data("cell-value") != undefined && $(col).data("cell-value") != null) {
              console.log("USING CELL-VALUE" + $(col).data("cell-value"));
              console.log( col );
              values[rowIndex][ headings[colIndex] ] = $(col).data("cell-value");
            } else {
              values[rowIndex][ headings[colIndex] ] = $.trim($(col).text());
            }
          }
        });
      }
    });
    return values;
  };
})( jQuery );

