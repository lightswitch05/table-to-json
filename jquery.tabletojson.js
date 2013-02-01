/**
  Table To JSON jQuery Plugin
  by Daniel White - developerdan.com

  Copyright (c) 2013 Daniel White. Released under the MIT License.

  Version: 0.1.0

  Feel free to contribute to this project on GitHub by
  submitting pull requests and reporting issues.
**/
(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    var defaults = {
      ignoreColNum: [],
      ignoreHiddenRows: true
    };
    opts = $.extend(defaults, opts);

    var headings = new Array();
    this.find("thead tr th").each(function(colIndex, col) {
      if($.inArray(colIndex, opts.ignoreColNum) == -1) {
        if($(col).data("column-name") != undefined || $(col).data("column-name") != null) {
          headings[colIndex] = $(col).data("column-name");
        } else {
          headings[colIndex] = $(col).text().trim();
        }
      } else {
        headings[colIndex] = null;
      }
    });

    var values = new Array();
    this.find("tbody tr").each(function(rowIndex, row) {
      if( !opts.ignoreHiddenRows ||  $(row).css('display') != "none" ){
        values[rowIndex] = {};
        $(row).find("td").each(function(colIndex, col) {
          if( headings[colIndex] != null ){
            values[rowIndex][ headings[colIndex] ] = $(col).text().trim();
          }
        });
      }
    });
    return values;
  };
})( jQuery );

