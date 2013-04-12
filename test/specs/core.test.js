module("core");

/* Basic Usage */
test("basic usage", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<th>First Name</th>" +
          "<th>Last Name</th>" +
          "<th>Points</th>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON();
  var expected = [{"First Name":"Jill", "Last Name":"Smith", "Points":"50"},
                  {"First Name":"Eve", "Last Name":"Jackson", "Points":"94"},
                  {"First Name":"John", "Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});

/* Basic Usage with thead and tbody*/
test("basic usage with thead and tbody", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<thead>" +
          "<tr>" +
            "<th>First Name</th>" +
            "<th>Last Name</th>" +
            "<th>Points</th>" +
          "</tr>" +
        "</thead>" +
        "<tbody>" +
          "<tr>" +
            "<td>Jill</td>" +
            "<td>Smith</td>" +
            "<td>50</td>" +
          "</tr>" +
          "<tr>" +
            "<td>Eve</td>" +
            "<td>Jackson</td>" +
            "<td>94</td>" +
          "</tr>" +
          "<tr>" +
            "<td>John</td>" +
            "<td>Doe</td>" +
            "<td>80</td>" +
          "</tr>" +
        "</tbody>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON();
  var expected = [{"First Name":"Jill", "Last Name":"Smith", "Points":"50"},
                  {"First Name":"Eve", "Last Name":"Jackson", "Points":"94"},
                  {"First Name":"John", "Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});

/* Override Column Names */
test("override column names", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<th data-column-name='Nickname'>First Name</th>" +
          "<th>Last Name</th>" +
          "<th>Points</th>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON();
  var expected = [{"Nickname":"Jill", "Last Name":"Smith", "Points":"50"},
                  {"Nickname":"Eve", "Last Name":"Jackson", "Points":"94"},
                  {"Nickname":"John", "Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});

/* Override Cell Values */
test("override column names", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<th data-column-name='Nickname'>First Name</th>" +
          "<th>Last Name</th>" +
          "<th>Points</th>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td data-cell-value='disqualified'>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON();
  var expected = [{"Nickname":"Jill", "Last Name":"Smith", "Points":"disqualified"},
                  {"Nickname":"Eve", "Last Name":"Jackson", "Points":"94"},
                  {"Nickname":"John", "Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});

/* Ignore Column */
test("ignore columns", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<th>First Name</th>" +
          "<th>Last Name</th>" +
          "<th>Points</th>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON({
        ignoreColNum: [0]
  });
  var expected = [{"Last Name":"Smith", "Points":"50"},
                  {"Last Name":"Jackson", "Points":"94"},
                  {"Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});

/* Ignore Hidden Row */
test("ignore hidden rows", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<th>First Name</th>" +
          "<th>Last Name</th>" +
          "<th>Points</th>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr style='display: none;'>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON();
  var expected = [{"First Name":"Jill", "Last Name":"Smith", "Points":"50"},
                  {"First Name":"Eve", "Last Name":"Jackson", "Points":"94"}];
  deepEqual(table, expected);
});

/* Include Hidden Rows */
test("Include Hidden Rows", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<th>First Name</th>" +
          "<th>Last Name</th>" +
          "<th>Points</th>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr style='display: none;'>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON({
        ignoreHiddenRows: false
  });
  var expected = [{"First Name":"Jill", "Last Name":"Smith", "Points":"50"},
                  {"First Name":"Eve", "Last Name":"Jackson", "Points":"94"},
                  {"First Name":"John", "Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});

/* Read first row of td's as column when there are no th's*/
test("without any th's", function() {
  $("#qunit-fixture").html(
      "<table id='test-table'>" +
        "<tr>" +
          "<td>First Name</td>" +
          "<td>Last Name</td>" +
          "<td>Points</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Jill</td>" +
          "<td>Smith</td>" +
          "<td>50</td>" +
        "</tr>" +
        "<tr>" +
          "<td>Eve</td>" +
          "<td>Jackson</td>" +
          "<td>94</td>" +
        "</tr>" +
        "<tr>" +
          "<td>John</td>" +
          "<td>Doe</td>" +
          "<td>80</td>" +
        "</tr>" +
      "</table>"
    );


  expect(1);
  var table = $("#test-table").tableToJSON({
        ignoreHiddenRows: false
  });
  var expected = [{"First Name":"Jill", "Last Name":"Smith", "Points":"50"},
                  {"First Name":"Eve", "Last Name":"Jackson", "Points":"94"},
                  {"First Name":"John", "Last Name":"Doe", "Points":"80"}]
  deepEqual(table, expected);
});