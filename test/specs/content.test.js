/*global module, test, expect, deepEqual */

module('content');

/* Ignore nested tables in cells with just td's*/
test('ignore nested <td> in cells', function() {
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
          '<td>Eve <table><tr><td>1</td></tr><tr><td>2</td></tr></table> </td>' +
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
  var expected = [
    {'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'First Name':'Eve 12', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* Ignore nested tables in cells with th's and td's*/
test('ignore nested <th> and <td> in cells', function() {
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
          '<td>Eve <table><tr><th>number</th></tr><tr><td>1</td></tr><tr><td>2</td></tr></table> </td>' +
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
  var expected = [
    {'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'First Name':'Eve number12', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* Ignore nested tables in headings with just td's*/
test('ignore nested <td> in headings', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name <table><tr><td>1</td></tr><tr><td>2</td></tr></table> </th>' +
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
  var expected = [
    {'First Name':'Jill', 'Last Name 12':'Smith', 'Points':'50'},
    {'First Name':'Eve', 'Last Name 12':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name 12':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* Ignore nested tables in headings with th's and td's*/
test('ignore nested <th> and <td> in headings', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name <table><tr><th>number</th></tr><tr><td>1</td></tr><tr><td>2</td></tr></table> </th>' +
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
  var expected = [
    {'First Name':'Jill', 'Last Name number12':'Smith', 'Points':'50'},
    {'First Name':'Eve', 'Last Name number12':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name number12':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* Links are retrieved as values */
test('links are just values', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td><a href="#">Jill</a></td>' +
          '<td><a href="#">Smith</a></td>' +
          '<td><a href="#">50</a></td>' +
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
  var expected = [
    {'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* A complex table */
test('complex table', function() {
  $('#qunit-fixture').html(
      '<table id="test-table" class="table table-striped table-hover table-condensed" data-role="rate_table"> <thead> <tr> <th data-override="id"><input type="checkbox" data-role="checkall" data-check-name="row_ids[]"></th> <th data-override="State">Status</th> <th data-override="BCS">Location</th> <th data-override="ZONE">Zone</th> <th data-override="TIER">Tier</th> <th data-override="INSTALL_CALC">Install Calc</th> <th data-override="INSTALL_R1">Install Rate</th> </tr> </thead> <tbody> <tr> <td data-override="oaWd4cs2JHY660pG"><input id="oaWd4cs2JHY660pG" name="row_ids[]" type="checkbox" value="oaWd4cs2JHY660pG"> <i class="icon-arrow-down hover" data-title="Copy row" data-role="copy-row" data-original-title=""></i> <i class="icon-remove hover" data-title="Delete row" data-role="delete-row" data-original-title=""></i> <i class="icon-warning-sign hover" data-role="ok-modal" data-modal-name="row-errors-modal" data-title="Display rate table errors" data-original-title=""></i> <div class="hidden" data-role="row-errors-modal" title="Rate Table Errors"> <p> The specified value () is invalid for the field (ACCSIN_TYP). </p> <p> The specified value () is invalid for the field (ZONE). </p> <p> The specified value () is invalid for the field (TIERIND). </p> <p> The specified value () is invalid for the field (CALCTYPE). </p> <p> The required decimal value is not valid.  The value must be between (-9999999999.999999) and (9999999999.999999). </p> </div>   <i data-title="Row Audit Trail" data-modal-name="audit-modal" data-role="ok-modal" class="icon-tags hover" data-original-title=""></i> <div class="hidden" data-role="audit-modal" title="Audit Trail"> <table class="table table-striped table-hover table-condensed"> <thead> <tr> <th>Date</th> <th>User ID</th> <th>From</th> <th>To</th> <th>Action</th> </tr> </thead> <tbody><tr> <td> 2013-02-12 09:26:21 </td> <td> tapadmin </td> <td>  </td> <td> INCOMPLETE </td> <td> Rate Table Detail Creation </td> </tr><tr> <td> 2013-02-12 09:26:21 </td> <td> tapadmin </td> <td> INCOMPLETE </td> <td> INCOMPLETE </td> <td> Rate table change </td> </tr><tr> <td> 2013-02-13 07:37:26 </td> <td> tapadmin </td> <td> INCOMPLETE </td> <td> INCOMPLETE </td> <td> Rate table change </td> </tr><tr> <td> 2013-02-14 09:04:40 </td> <td> tapadmin </td> <td> INCOMPLETE </td> <td> INCOMPLETE </td> <td> Rate table change </td> </tr><tr> <td> 2013-02-14 09:05:33 </td> <td> tapadmin </td> <td> INCOMPLETE </td> <td> INCOMPLETE </td> <td> Rate table change </td> </tr><tr> <td> 2013-02-14 09:49:55 </td> <td> tapadmin </td> <td> INCOMPLETE </td> <td> INCOMPLETE </td> <td> Rate table change </td> </tr><tr> <td> 2013-02-14 09:50:11 </td> <td> tapadmin </td> <td> INCOMPLETE </td> <td> INCOMPLETE </td> <td> Rate table change </td> </tr><tr> <td> 2013-02-14 09:50:11 </td> <td> tapadmin </td> <td>  </td> <td> INCOMPLETE </td> <td> Rate row created </td> </tr></tbody></table> </div> </td> <td data-type="row-status">INCOMPLETE</td> <td> <a data-type="text" data-group-code="ACCSIN_TYP" class="editable editable-click editable-unsaved" data-original-title="">location</a> </td> <td> <a data-type="select" data-group-code="ZONE" class="editable editable-click editable-unsaved" data-original-title="">1</a> </td> <td> <a data-type="select" data-group-code="TIERIND" class="editable editable-click editable-unsaved" data-original-title="">QTY</a> </td> <td> <a data-type="text" data-group-code="" class="editable editable-click editable-unsaved" data-original-title="">B</a> </td> <td> <a data-type="text" data-group-code="" class="editable editable-click editable-unsaved" data-original-title="">9.5</a> </td> </tr> <tr style="display: none;"> <td data-override=""><input id="" name="row_ids[]" type="checkbox" value="new_row"> <i class="icon-arrow-down hover" data-title="Copy row" data-role="copy-row" data-original-title=""></i> <i class="icon-remove hover" data-title="Delete row" data-role="delete-row" data-original-title=""></i> </td> <td data-type="row-status">INCOMPLETE</td> <td> <a data-type="text" data-group-code="ACCSIN_TYP" class="editable editable-click editable-empty">Empty</a> </td> <td> <a data-type="select" data-group-code="ZONE" class="editable editable-click editable-empty">Empty</a> </td> <td> <a data-type="select" data-group-code="TIERIND" class="editable editable-click editable-empty">Empty</a> </td> <td> <a data-type="text" data-group-code="" class="editable editable-click editable-empty">Empty</a> </td> <td> <a data-type="text" data-group-code="" class="editable editable-click editable-empty">Empty</a> </td> </tr> </tbody> </table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [{'id':'oaWd4cs2JHY660pG', 'State':'INCOMPLETE', 'BCS':'location', 'ZONE':'1', 'TIER':'QTY', 'INSTALL_CALC':'B', 'INSTALL_R1':'9.5'}];
  deepEqual(table, expected);
});

/* A table with colspan */
test('A table with colspan', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
        '<tr>' +
          '<th>First Name</th>' +
          '<th>Last Name</th>' +
          '<th>Points</th>' +
        '</tr>' +
        '<tr>' +
          '<td colspan="3">Jill</td>' +
        '</tr>' +
        '<tr>' +
          '<td colspan="2">Eve</td>' +
          '<td>94</td>' +
        '</tr>' +
        '<tr>' +
          '<td colspan="1">John</td>' +
          '<td>Doe</td>' +
          '<td>80</td>' +
        '</tr>' +
      '</table>'
    );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [
    {'First Name':'Jill', 'Last Name':'Jill', 'Points':'Jill'},
    {'First Name':'Eve', 'Last Name':'Eve', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* ignoreColumns with colspan */
test('ignoreColumns with colspan', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
      '<tr>' +
      '<th>First Name</th>' +
      '<th>Last Name</th>' +
      '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
      '<td colspan="3">Jill</td>' +
      '</tr>' +
      '<tr>' +
      '<td colspan="2">Eve</td>' +
      '<td>94</td>' +
      '</tr>' +
      '<tr>' +
      '<td colspan="1">John</td>' +
      '<td>Doe</td>' +
      '<td>80</td>' +
      '</tr>' +
      '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({ ignoreColumns : [1] });
  var expected = [
    {'First Name':'Jill', 'Points':'Jill'},
    {'First Name':'Eve', 'Points':'94'},
    {'First Name':'John', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* A table with rowspan */
test('A table with rowspan', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
      '<tr>' +
        '<th>First Name</th>' +
        '<th>Last Name</th>' +
        '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
        '<td rowspan="3">Jill</td>' +
        '<td>Smith</td>' +
        '<td>50</td>' +
      '</tr>' +
      '<tr>' +
      '<td rowspan="2">Jackson</td>' +
        '<td>94</td>' +
      '</tr>' +
      '<tr>' +
        '<td>80</td>' +
      '</tr>' +
    '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [
    {'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'First Name':'Jill', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'Jill', 'Last Name':'Jackson', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* ignoreColumns with rowspan */
test('ignoreColumns with rowspan', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
      '<tr>' +
      '<th>First Name</th>' +
      '<th>Last Name</th>' +
      '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
      '<td rowspan="3">Jill</td>' +
      '<td>Smith</td>' +
      '<td>50</td>' +
      '</tr>' +
      '<tr>' +
      '<td rowspan="2">Jackson</td>' +
      '<td>94</td>' +
      '</tr>' +
      '<tr>' +
      '<td>80</td>' +
      '</tr>' +
      '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({ ignoreColumns : [1] });
  var expected = [
    {'First Name':'Jill', 'Points':'50'},
    {'First Name':'Jill', 'Points':'94'},
    {'First Name':'Jill', 'Points':'80'}
  ];
  deepEqual(table, expected);
});

/* ignoreColumns with rowspan */
test('ignoreRows with rowspan', function() {
  $('#qunit-fixture').html(
      '<table id="test-table">' +
      '<tr>' +
      '<th>First Name</th>' +
      '<th>Last Name</th>' +
      '<th>Points</th>' +
      '</tr>' +
      '<tr>' +
      '<td rowspan="3">Jill</td>' +
      '<td>Smith</td>' +
      '<td>50</td>' +
      '</tr>' +
      '<tr>' +
      '<td rowspan="2">Jackson</td>' +
      '<td>94</td>' +
      '</tr>' +
      '<tr>' +
      '<td>80</td>' +
      '</tr>' +
      '</table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON({ ignoreRows : [2] });
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
    {'First Name':'Jill', 'Last Name':'Jackson', 'Points':'80'}];
  deepEqual(table, expected);
});

/* A table with rowspan & colspan */
test('rowspan & colspan in tbody', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
    '<tr><th>line</th><th>value1</th><th>value2</th><th>value3</th><th>value4</th></tr>' +
    '<tr><td rowspan="2">1</td><td>1.1</td><td>1.2</td><td>1.3</td><td rowspan="2">1.4</td></tr>' +
    '<tr><td>1.5</td><td>1.6</td><td>1.7</td></tr>' +
    '<tr><td rowspan="2">2</td><td>2.1</td><td>2.2</td><td>2.3</td><td>2.4</td></tr>' +
    '<tr><td colspan="2">2.5</td><td>2.6</td><td>2.7</td></tr>' +
    '<tr><td rowspan="2">3</td><td rowspan="2" colspan="2">3.1</td><td colspan="2">3.2</td></tr>' +
    '<tr><td>3.4</td><td>3.5</td></tr>' +
    '</table>'
  );

  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected);
});

/* A table with rowspan & colspan & ignoreColumns */
test('ignoreColumns with rowspan & colspan in tbody', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
    '<tr><th>line</th><th>value1</th><th>value2</th><th>value3</th><th>value4</th></tr>' +
    '<tr><td rowspan="2">1</td><td>1.1</td><td>1.2</td><td>1.3</td><td rowspan="2">1.4</td></tr>' +
    '<tr><td>1.5</td><td>1.6</td><td>1.7</td></tr>' +
    '<tr><td rowspan="2">2</td><td>2.1</td><td>2.2</td><td>2.3</td><td>2.4</td></tr>' +
    '<tr><td colspan="2">2.5</td><td>2.6</td><td>2.7</td></tr>' +
    '<tr><td rowspan="2">3</td><td rowspan="2" colspan="2">3.1</td><td colspan="2">3.2</td></tr>' +
    '<tr><td>3.4</td><td>3.5</td></tr>' +
    '</table>'
  );

  expect(5);
  var $table = $('#test-table');
  var table = $table.tableToJSON({ ignoreColumns : [0] });
  var expected = [
    {'value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore Column "line"');

  table = $table.tableToJSON({ ignoreColumns : [1] });
  expected = [
    {'line':'1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore Column "value1"');

  table = $table.tableToJSON({ ignoreColumns : [2] });
  expected = [
    {'line':'1','value1':'1.1','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore Column "value2"');

  table = $table.tableToJSON({ ignoreColumns : [3] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore Column "value3"');

  table = $table.tableToJSON({ ignoreColumns : [4] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4'}
  ];
  deepEqual(table, expected, 'Ignore Column "value4"');

});

/* A table with rowspan & colspan & ignoreRows */
test('ignoreRows with rowspan & colspan in tbody', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
    '<tr><th>line</th><th>value1</th><th>value2</th><th>value3</th><th>value4</th></tr>' +
    '<tr><td rowspan="2">1</td><td>1.1</td><td>1.2</td><td>1.3</td><td rowspan="2">1.4</td></tr>' +
    '<tr><td>1.5</td><td>1.6</td><td>1.7</td></tr>' +
    '<tr><td rowspan="2">2</td><td>2.1</td><td>2.2</td><td>2.3</td><td>2.4</td></tr>' +
    '<tr><td colspan="2">2.5</td><td>2.6</td><td>2.7</td></tr>' +
    '<tr><td rowspan="2">3</td><td rowspan="2" colspan="2">3.1</td><td colspan="2">3.2</td></tr>' +
    '<tr><td>3.4</td><td>3.5</td></tr>' +
    '</table>'
  );

  expect(6);
  var $table = $('#test-table');
  var table = $table.tableToJSON({ ignoreRows : [1] });
  var expected = [
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore row 1');

  table = $table.tableToJSON({ ignoreRows : [2] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore row 2');

  table = $table.tableToJSON({ ignoreRows : [3] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore row 3');

  table = $table.tableToJSON({ ignoreRows : [4] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore row 4');

  table = $table.tableToJSON({ ignoreRows : [5] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected, 'Ignore row 5');

  table = $table.tableToJSON({ ignoreRows : [6] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2','value4':'3.2'}
  ];
  deepEqual(table, expected, 'Ignore row 6');
});

test('textDataOverride overrides', function() {
  $('#qunit-fixture').html(
    '<table id="test-table">' +
    '<tr>' +
    '<th>First Name</th>' +
    '<th>Last Name</th>' +
    '<th>Points</th>' +
    '</tr>' +
    '<tr>' +
    '<td data-override="Bobby" data-custom="Jack">Jill</td>' +
    '<td data-override="Bill" data-custom="Frost">Smith</td>' +
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

  expect(2);

  var table = $('#test-table').tableToJSON();
  var expected = [
    {'First Name':'Bobby', 'Last Name':'Bill', 'Points':'50'},
    {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected, 'Default override');

  table = $('#test-table').tableToJSON({ textDataOverride: 'data-custom'});
  expected = [
    {'First Name':'Jack', 'Last Name':'Frost', 'Points':'50'},
    {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
    {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}
  ];
  deepEqual(table, expected, 'Custom override');
});
