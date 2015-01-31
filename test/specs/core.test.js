/*global module, test, expect, deepEqual */

module('core');

/* Basic Usage */
test('basic usage', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td>50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Basic Usage with thead and tbody*/
test('basic usage with thead and tbody', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<thead>' +
          '<tr>' +
            '<th>First Name</th>' +
            '<th>Last Name</th>' +
            '<th>Points</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr>' +
            '<td>Jill</td>' +
            '<td>Smith</td>' +
            '<td>50</td>' +
          '</tr>' +
          '<tr>' +
            '<td>Eve</td>' +
            '<td>Jackson</td>' +
            '<td>94</td>' +
          '</tr>' +
          '<tr>' +
            '<td>John</td>' +
            '<td>Doe</td>' +
            '<td>80</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Override Column Names */
test('override column names', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th data-override="Nickname">First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td>50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'Nickname':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'Nickname':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'Nickname':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Override Cell Values */
test('override column names', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th data-override="Nickname">First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td data-override="disqualified">50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'Nickname':'Jill', 'Last Name':'Smith', 'Points':'disqualified'},
                  {'Nickname':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'Nickname':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Ignore Column */
test('ignore columns', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td>50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON({
    ignoreColumns: [0]
  });
  var expected = [
    {'Last Name':'Smith', 'Points':'50'},
    {'Last Name':'Jackson', 'Points':'94'},
    {'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* Ignore Hidden Row */
test('ignore hidden rows', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr style="display: none;">' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'}];
  deepEqual(table, expected);
});

/* Include Hidden Rows */
test('Include Hidden Rows', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td>50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr style="display: none;">' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON({
    ignoreHiddenRows: false
  });
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Ignore Empty Row */
test('ignore empty rows', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr">' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({ignoreEmptyRows:true});
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'}];
  deepEqual(table, expected);
});

/* Include Empty Row */
test('ignore empty rows', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr">' +
        '<td></td>' +
        '<td></td>' +
        '<td></td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'', 'Last Name':'', 'Points':''}];
  deepEqual(table, expected);
});

/* Ignore Row Option */
test('ignore empty rows', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr data-ignore="true">' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr data-ignore="false">' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({ignoreEmptyRows:true});
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Read first row of td's as column when there are no th's*/
test('without any <th>', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<td>First Name</td>' +
          '<td>Last Name</td>' +
          '<td>Points</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td>50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
  deepEqual(table, expected);
});

/* Uses the onlyColumns option to only include the first column*/
test('Ony include 1 column', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td>Jill</td>' +
          '<td>Smith</td>' +
          '<td>50</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Eve</td>' +
          '<td>Jackson</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td>John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON({
    onlyColumns: [0]
  });
  var expected = [
    {'First Name':'Jill'},
    {'First Name':'Eve'},
    {'First Name':'John'}
  ];
  deepEqual(table, expected);
});

/* onlyColumns option overrides ignoreColumns option */
test('onlyColumns option overrides ignoreColumns option', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr>' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({
    onlyColumns: [0, 1],
    ignoreColumns: [0, 1]
  });
  var expected = [
    {'First Name':'Jill', 'Last Name':'Smith'},
    {'First Name':'Eve', 'Last Name':'Jackson'},
    {'First Name':'John', 'Last Name':'Doe'}
  ];
  deepEqual(table, expected);
});

/* headings option uses all rows as data */
test('headings option uses all rows as data', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr>' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({
    headings: ['First Name', 'Last Name', 'Points']
  });
  var expected = [
    {'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* headings option works with ignoreColumns option */
test('headings option works with ignoreColumns option', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr>' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({
    ignoreColumns: [0],
    headings: ['Last Name', 'Points']
  });
  var expected = [
    {'Last Name':'Smith', 'Points':'50'},
    {'Last Name':'Jackson', 'Points':'94'},
    {'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* headings option works with onlyColumns option */
test('headings option works with onlyColumns option', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr>' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({
    onlyColumns: [1, 2],
    headings: ['Last Name', 'Points']
  });
  var expected = [
    {'Last Name':'Smith', 'Points':'50'},
    {'Last Name':'Jackson', 'Points':'94'},
    {'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* allowHTML option allows HTML tags within a table to remain in the object */
test('allowHTML option allows HTML tags within a table to remain in the object', function () {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>Jill</strong></td>' +
        '<td><span class="lastName">Smith</span></td>' +
        '<td><em>50</em></td>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>Eve</strong></td>' +
        '<td><span class="lastName">Jackson</span></td>' +
        '<td><em>94</em></td>' +
      '</tr>' +
      '<tr>' +
        '<td><strong>John</strong></td>' +
        '<td><span class="lastName">Doe</span></td>' +
        '<td><em>80</em></td>' +
      '</tr>' +
    '</table>'
  );

  expect(1);
  var table = $('#test-table').tableToJSON({
    allowHTML: true
  });
  var expected = [
    {'First Name':'<strong>Jill</strong>', 'Last Name':'<span class="lastName">Smith</span>', 'Points':'<em>50</em>'},
    {'First Name':'<strong>Eve</strong>', 'Last Name':'<span class="lastName">Jackson</span>', 'Points':'<em>94</em>'},
    {'First Name':'<strong>John</strong>', 'Last Name':'<span class="lastName">Doe</span>', 'Points':'<em>80</em>'}
  ];
  deepEqual(table, expected);
});

/* includeRowId option boolean type places the attribute ID from the row as a property of the row */
test('includeRowId option boolean type places the attribute ID from the row as a property of the row', function () {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr id="1">' +
      '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr id="2">' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr id="3">' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
      '<tr>' +
        '<td>No</td>' +
        '<td>Row</td>' +
        '<td>ID</td>' +
      '</tr>' +
    '</table>'
  );

  expect(1);
  var table = $('#test-table').tableToJSON({
    includeRowId: true
  });
  var expected = [
    {'rowId':'1', 'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'rowId':'2', 'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
    {'rowId':'3', 'First Name':'John', 'Last Name':'Doe', 'Points':'80'},
    {'rowId':'', 'First Name':'No', 'Last Name':'Row', 'Points':'ID'}
  ];
  deepEqual(table, expected);
});

/* includeRowId option custom, instead of a boolean use a string, and string value will be the property name. */
test('includeRowId option string type, instead of a boolean use a string, and string value will be the property name', function () {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr id="1">' +
      '<td>Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr id="2">' +
        '<td>Eve</td>' +
        '<td>Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr id="3">' +
        '<td>John</td>' +
        '<td>Doe</td>' +
        '<td>80</td>' +
      '</tr>' +
      '<tr>' +
        '<td>No</td>' +
        '<td>Row</td>' +
        '<td>ID</td>' +
      '</tr>' +
    '</table>'
  );

  expect(1);
  var table = $('#test-table').tableToJSON({
    includeRowId: 'customIDname'
  });
  var expected = [
    {'customIDname':'1', 'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'customIDname':'2', 'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
    {'customIDname':'3', 'First Name':'John', 'Last Name':'Doe', 'Points':'80'},
    {'customIDname':'', 'First Name':'No', 'Last Name':'Row', 'Points':'ID'}
  ];
  deepEqual(table, expected);
});

test('Basic Usage textExtractor option', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<thead>' +
          '<tr>' +
            '<th>Title</th>' +
            '<th>Street</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr>' +
            '<td><span>Doctor</span> Jill Smith</td>' +
            '<td>123 <span>Main</span> Street</td>' +
          '</tr>' +
          '<tr>' +
            '<td><span>President</span> Eve Jackson</td>' +
            '<td>999 <span>National</span> Blvd.</td>' +
          '</tr>' +
          '<tr>' +
            '<td><span>Mr.</span> John Doe</td>' +
            '<td>555 <span>Letter</span> Ave.</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON({
    textExtractor : function(cellIndex, $cell) {
      return $cell.find('span').text();
    }
  });
  var expected = [{'Title':'Doctor', 'Street':'Main'},
                  {'Title':'President', 'Street':'National'},
                  {'Title':'Mr.', 'Street':'Letter'}];
  deepEqual(table, expected);
});

test('textExtractor option per column', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<thead>' +
          '<tr>' +
            '<th>Title</th>' +
            '<th>Number</th>' +
            '<th>Date</th>' +
          '</tr>' +
        '</thead>' +
        '<tbody>' +
          '<tr>' +
            '<td><span>Doctor</span> Jill Smith</td>' +
            '<td data-override="345"><em>123</em> Main Street</td>' +
            '<td>1/31/2015</td>' +
          '</tr>' +
          '<tr>' +
            '<td><span>President</span> Eve Jackson</td>' +
            '<td><em>999</em> National Blvd.</td>' +
            '<td>2/1/2014</td>' +
          '</tr>' +
          '<tr>' +
            '<td><span>Mr.</span> John Doe</td>' +
            '<td><em>555</em> Letter Ave.</td>' +
            '<td>12/2/2014</td>' +
          '</tr>' +
        '</tbody>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON({
    textExtractor : {
      0 : function(cellIndex, $cell) {
        return $cell.find('span').text();
      },
      1 : function(cellIndex, $cell) {
        return $cell.find('em').text();
      },
      2 : function(cellIndex, $cell) {
        return new Date( $cell.text() ).toString();
      }
    }
  });
  var dates = [ '1/31/2015', '2/1/2014', '12/2/2014' ];
  $.each(dates, function(i,v){
    dates[i] = new Date(v).toString();
  });
  var expected = [{'Title':'Doctor', 'Number':'345', 'Date': dates[0]},
                  {'Title':'President', 'Number':'999', 'Date': dates[1]},
                  {'Title':'Mr.', 'Number':'555', 'Date': dates[2] }];
  deepEqual(table, expected);
});
