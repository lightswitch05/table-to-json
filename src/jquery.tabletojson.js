(function($) {
	    $.extend({
	        toDictionary: function(query) {
	            var parms = {};
	            var items = query.split("&"); // split
            for (var i = 0; i < items.length; i++) {
                var values = items[i].split("=");
                var key = decodeURIComponent(values.shift());
                var value = values.join("=");
            }
            return decodeURIComponent(value);
        }
    })
})(jQuery);

(function( $ ) {
  'use strict';

  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColumns: [],
      onlyColumns: null,
      ignoreHiddenRows: true,
      headings: null,
      allowHTML: false,
      formatHeader: false,
      allValueTag: false
    };
    opts = $.extend(defaults, opts);

    var notNull = function(value) {
      return value !== undefined && value !== null;
    };

    var ignoredColumn = function(index) {
      if( notNull(opts.onlyColumns) ) {
        return $.inArray(index, opts.onlyColumns) === -1;
      }
      return $.inArray(index, opts.ignoreColumns) !== -1;
    };

    var arraysToHash = function(keys, values) {
    	var keysFormat = new Array();
    	$.each(keys, function(i, v) {
    		if(opts.formatHeader) {
    			keysFormat.push(replace(v));
    		} else {
    			keysFormat.push(v);
    		}
    	});    	
    	
      var result = {}, index = 0;
      $.each(values, function(i, value) {
        // when ignoring columns, the header option still starts
        // with the first defined column
        if ( index < keysFormat.length && notNull(value) ) {
          result[ keysFormat[index] ] = value;
          index++;
        }
      });
     
      return result;
    };

    var cellValues = function(cellIndex, cell) {
      var value, result;
      var override = $(cell).data('override');
      if ( opts.allowHTML ) {
        value = $.trim($(cell).html());
      } else {
    	  if(opts.allValueTag) {
	    	  var select = $(cell).find('select option:selected').val();    	  
	          if($.trim($(cell).text()) == "" || select != undefined) {
	              var serialized = $(cell).find('input, textarea, select').serialize();
	              var item = $.toDictionary(serialized);
	              value = item;
	          } else {
	        	  value = $.trim($(cell).text());
	          }
    	  } else {
    		  value = $.trim($(cell).text());
    	  }
      }
      result = notNull(override) ? override : value;
      return result;
    };
    
    var replace = function(firstRow) {
    	if(jQuery.type(firstRow) === "string") {
	    	var result =  firstRow.replace(/[áàâãª]/g, 'a').replace(/[ÁÀÂÃ]/g, 'A')
	    			.replace(/[éèêë]/g, 'e').replace(/[ÉÈÊË]/g, 'E').replace(/[íìî]/g, 'i').replace(/[ÍÌÎ]/g, 'I')
	    			.replace(/[ÓÒÔÕ]/g, 'O').replace(/[óòôõº]/g, 'o').replace(/[úùû]/g, 'u')
	    			.replace(/[ÚÙÛÜ]/g, 'U').replace(/[ç]/g, 'c').replace(/[Ç]/g, 'C').replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
	    	
    	}    	
    	return result;
    }

    var rowValues = function(row) {
      var result = [];
      $(row).children('td,th').each(function(cellIndex, cell) {
        result.push( cellValues(cellIndex, cell) );
      });
      return result;
    };

    var getHeadings = function(table) {
      var firstRow = table.find('tr:first').first();
      return notNull(opts.headings) ? opts.headings : rowValues(firstRow);
    };

    var construct = function(table, headings) {
      var i, j, len, len2, txt, $row, $cell,
        tmpArray = [], cellIndex = 0, result = [];
      table.children('tbody,*').children('tr').each(function(rowIndex, row) {
        if( rowIndex > 0 || notNull(opts.headings) ) {
          $row = $(row);
          if( $row.is(':visible') || !opts.ignoreHiddenRows ) {
            if (!tmpArray[rowIndex]) {
              tmpArray[rowIndex] = [];
            }
            cellIndex = 0;
            $row.children().each(function(){
              $cell = $(this);

              // process rowspans
              if ($cell.filter('[rowspan]').length) {
                len = parseInt( $cell.attr('rowspan'), 10) - 1;
                txt = cellValues(cellIndex, $cell, []);
                for (i = 1; i <= len; i++) {
                  if (!tmpArray[rowIndex + i]) { tmpArray[rowIndex + i] = []; }
                  tmpArray[rowIndex + i][cellIndex] = txt;
                }
              }
              // process colspans
              if ($cell.filter('[colspan]').length) {
                len = parseInt( $cell.attr('colspan'), 10) - 1;
                txt = cellValues(cellIndex, $cell, []);
                for (i = 1; i <= len; i++) {
                  // cell has both col and row spans
                  if ($cell.filter('[rowspan]').length) {
                    len2 = parseInt( $cell.attr('rowspan'), 10);
                    for (j = 0; j < len2; j++) {
                      tmpArray[rowIndex + j][cellIndex + i] = txt;
                    }
                  } else {
                    tmpArray[rowIndex][cellIndex + i] = txt;
                  }
                }
              }
              // skip column if already defined
              while (tmpArray[rowIndex][cellIndex]) { cellIndex++; }
              txt = tmpArray[rowIndex][cellIndex] || cellValues(cellIndex, $cell, []);
              if (notNull(txt)) {
                tmpArray[rowIndex][cellIndex] = txt;
              }
              cellIndex++;
            });
          }
        }
      });
      $.each(tmpArray, function( i, row ){
        if (notNull(row)) {
          // remove ignoredColumns / add onlyColumns
          var newRow = notNull(opts.onlyColumns) || opts.ignoreColumns.length ?
            $.grep(row, function(v, index){ return !ignoredColumn(index); }) : row,

            // remove ignoredColumns / add onlyColumns if headings is not defined
            newHeadings = notNull(opts.headings) ? headings :
              $.grep(headings, function(v, index){ return !ignoredColumn(index); });
            
          txt = arraysToHash(newHeadings, newRow);
          result[result.length] = txt;
        }
      });
      return result;
    };

    // Run
    var headings = getHeadings(this);
    return construct(this, headings);
  };
})( jQuery );
