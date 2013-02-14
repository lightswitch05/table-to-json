(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColNum: [],
      ignoreHiddenRows: true
    };
    opts = $.extend(defaults, opts);

    // Gather headings
    var headings = [];
    this.find("tr > th").each(function(colIndex, col) {
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

    // Gather values
    var values = [];
    this.children("tbody").children("tr:has(td)")
    .filter(function(index){
      // Only get rows with values, no headings
      return $(this).children("th").length === 0;
    }).each(function(rowIndex, row) {
      if( $(row).is(':visible') || !opts.ignoreHiddenRows ) {
        values[rowIndex] = {};
        $(row).children("td").each(function(colIndex, col) {
          if( headings[colIndex] !== undefined && headings[colIndex] !== null){
            if($(col).data("cell-value") !== undefined && $(col).data("cell-value") !== null) {
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

