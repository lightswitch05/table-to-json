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
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve 12', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
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
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve number12', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
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
  var expected = [{'First Name':'Jill', 'Last Name 12':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name 12':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name 12':'Doe', 'Points':'80'}];
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
  var expected = [{'First Name':'Jill', 'Last Name number12':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name number12':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name number12':'Doe', 'Points':'80'}];
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
  var expected = [{'First Name':'Jill', 'Last Name':'Smith', 'Points':'50'},
                  {'First Name':'Eve', 'Last Name':'Jackson', 'Points':'94'},
                  {'First Name':'John', 'Last Name':'Doe', 'Points':'80'}];
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
  $table.find('tr:eq(0)').hide();
  var table = $table.tableToJSON({ headings: [ 'v1','v2','v3','v4' ], ignoreColumns : [0] });
  $table.find('tr:eq(0)').show();
  var expected = [
    {'v1':'1.1','v2':'1.2','v3':'1.3','v4':'1.4'},
    {'v1':'1.5','v2':'1.6','v3':'1.7','v4':'1.4'},
    {'v1':'2.1','v2':'2.2','v3':'2.3','v4':'2.4'},
    {'v1':'2.5','v2':'2.5','v3':'2.6','v4':'2.7'},
    {'v1':'3.1','v2':'3.1','v3':'3.2','v4':'3.2'},
    {'v1':'3.1','v2':'3.1','v3':'3.4','v4':'3.5'}
  ];
  deepEqual(table, expected);

  table = $table.tableToJSON({ ignoreColumns : [1] });
  expected = [
    {'line':'1','value2':'1.2','value3':'1.3','value4':'1.4'},
    {'line':'1','value2':'1.6','value3':'1.7','value4':'1.4'},
    {'line':'2','value2':'2.2','value3':'2.3','value4':'2.4'},
    {'line':'2','value2':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value2':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value2':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected);

  table = $table.tableToJSON({ ignoreColumns : [2] });
  expected = [
    {'line':'1','value1':'1.1','value3':'1.3','value4':'1.4'},
    {'line':'1','value1':'1.5','value3':'1.7','value4':'1.4'},
    {'line':'2','value1':'2.1','value3':'2.3','value4':'2.4'},
    {'line':'2','value1':'2.5','value3':'2.6','value4':'2.7'},
    {'line':'3','value1':'3.1','value3':'3.2','value4':'3.2'},
    {'line':'3','value1':'3.1','value3':'3.4','value4':'3.5'}
  ];
  deepEqual(table, expected);

  table = $table.tableToJSON({ ignoreColumns : [3] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value4':'1.4'},
    {'line':'1','value1':'1.5','value2':'1.6','value4':'1.4'},
    {'line':'2','value1':'2.1','value2':'2.2','value4':'2.4'},
    {'line':'2','value1':'2.5','value2':'2.5','value4':'2.7'},
    {'line':'3','value1':'3.1','value2':'3.1','value4':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value4':'3.5'}
  ];
  deepEqual(table, expected);

  table = $table.tableToJSON({ ignoreColumns : [4] });
  expected = [
    {'line':'1','value1':'1.1','value2':'1.2','value3':'1.3'},
    {'line':'1','value1':'1.5','value2':'1.6','value3':'1.7'},
    {'line':'2','value1':'2.1','value2':'2.2','value3':'2.3'},
    {'line':'2','value1':'2.5','value2':'2.5','value3':'2.6'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.2'},
    {'line':'3','value1':'3.1','value2':'3.1','value3':'3.4'}
  ];
  deepEqual(table, expected);

});

/* A complex table with row & col spans */
test('complex table with row & col spans', function() {
  $('#qunit-fixture').html(
    '<table id="test-table" data-numcols="0" data-numrows="36"> <tr> <th>Rota</th> <th>Descrição Descritor</th> <th>Ano</th> <th>Mês (completo)</th> <th>Dia</th> <th>Intervalo 30min</th> <th>Totais</th> </tr><tr> <td rowspan="14">null</td><td rowspan="2">AutoAtendimento</td><td rowspan="2">2015</td><td rowspan="2">01-Jan</td><td rowspan="2">06</td><td rowspan="1">11:00:00</td><td data-for="row0">1</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row1">3</td></tr><tr> <td rowspan="6">Fila</td><td rowspan="6">2015</td><td rowspan="6">01-Jan</td><td rowspan="2">06</td><td rowspan="1">11:00:00</td><td data-for="row2">1</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row3">2</td></tr><tr> <td rowspan="4">27</td><td rowspan="1">11:30:00</td><td data-for="row4">1</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row5">1</td></tr><tr> <td rowspan="1">15:00:00</td><td data-for="row6">4</td></tr><tr> <td rowspan="1">16:00:00</td><td data-for="row7">2</td></tr><tr> <td rowspan="6">Inicio</td><td rowspan="6">2015</td><td rowspan="6">01-Jan</td><td rowspan="2">06</td><td rowspan="1">11:00:00</td><td data-for="row8">2</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row9">5</td></tr><tr> <td rowspan="4">27</td><td rowspan="1">11:30:00</td><td data-for="row10">1</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row11">1</td></tr><tr> <td rowspan="1">15:00:00</td><td data-for="row12">4</td></tr><tr> <td rowspan="1">16:00:00</td><td data-for="row13">2</td></tr><tr> <td rowspan="22">Rota externa</td><td rowspan="2">AutoAtendimento</td><td rowspan="2">2015</td><td rowspan="2">01-Jan</td><td rowspan="2">06</td><td rowspan="1">12:00:00</td><td data-for="row14">1</td></tr><tr> <td rowspan="1">12:30:00</td><td data-for="row15">2</td></tr><tr> <td rowspan="9">Fila</td><td rowspan="9">2015</td><td rowspan="9">01-Jan</td><td rowspan="2">06</td><td rowspan="1">12:00:00</td><td data-for="row16">1</td></tr><tr> <td rowspan="1">12:30:00</td><td data-for="row17">2</td></tr><tr> <td rowspan="7">27</td><td rowspan="1">10:30:00</td><td data-for="row18">1</td></tr><tr> <td rowspan="1">11:00:00</td><td data-for="row19">2</td></tr><tr> <td rowspan="1">11:30:00</td><td data-for="row20">1</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row21">2</td></tr><tr> <td rowspan="1">16:00:00</td><td data-for="row22">2</td></tr><tr> <td rowspan="1">18:30:00</td><td data-for="row23">1</td></tr><tr> <td rowspan="1">19:00:00</td><td data-for="row24">1</td></tr><tr> <td rowspan="11">Inicio</td><td rowspan="11">2015</td><td rowspan="10">01-Jan</td><td rowspan="2">06</td><td rowspan="1">12:00:00</td><td data-for="row25">2</td></tr><tr> <td rowspan="1">12:30:00</td><td data-for="row26">4</td></tr><tr> <td rowspan="7">27</td><td rowspan="1">10:30:00</td><td data-for="row27">2</td></tr><tr> <td rowspan="1">11:00:00</td><td data-for="row28">2</td></tr><tr> <td rowspan="1">11:30:00</td><td data-for="row29">1</td></tr><tr> <td rowspan="1">12:00:00</td><td data-for="row30">2</td></tr><tr> <td rowspan="1">16:00:00</td><td data-for="row31">2</td></tr><tr> <td rowspan="1">18:30:00</td><td data-for="row32">1</td></tr><tr> <td rowspan="1">19:00:00</td><td data-for="row33">1</td></tr><tr> <td rowspan="1">30</td><td rowspan="1">20:00:00</td><td data-for="row34">1</td></tr><tr> <td rowspan="1">02-Feb</td><td rowspan="1">03</td><td rowspan="1">14:30:00</td><td data-for="row35">1</td></tr><tr> <th colspan="6">Totais</th> <td>34</td></tr></table>'
  );


  expect(1);
  var table = $('#test-table').tableToJSON();
  var expected = [
    {
      'Ano': '2015',
      'Descrição Descritor': 'AutoAtendimento',
      'Dia': '06',
      'Intervalo 30min': '11:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'AutoAtendimento',
      'Dia': '06',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '3'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '06',
      'Intervalo 30min': '11:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '06',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '11:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '15:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '4'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '16:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '06',
      'Intervalo 30min': '11:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '06',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '5'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '11:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '15:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '4'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '16:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'null',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'AutoAtendimento',
      'Dia': '06',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'AutoAtendimento',
      'Dia': '06',
      'Intervalo 30min': '12:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '06',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '06',
      'Intervalo 30min': '12:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '10:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '11:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '11:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '16:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '18:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Fila',
      'Dia': '27',
      'Intervalo 30min': '19:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '06',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '06',
      'Intervalo 30min': '12:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '4'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '10:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '11:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '11:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '12:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '16:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '2'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '18:30:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '27',
      'Intervalo 30min': '19:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '30',
      'Intervalo 30min': '20:00:00',
      'Mês (completo)': '01-Jan',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': '2015',
      'Descrição Descritor': 'Inicio',
      'Dia': '03',
      'Intervalo 30min': '14:30:00',
      'Mês (completo)': '02-Feb',
      'Rota': 'Rota externa',
      'Totais': '1'
    },
    {
      'Ano': 'Totais',
      'Descrição Descritor': 'Totais',
      'Dia': 'Totais',
      'Intervalo 30min': 'Totais',
      'Mês (completo)': 'Totais',
      'Rota': 'Totais',
      'Totais': '34'
    }
  ];
  deepEqual(table, expected);
});