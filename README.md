# Table To JSON

[![Build Status](https://travis-ci.org/lightswitch05/table-to-json.png?branch=master)](https://travis-ci.org/lightswitch05/table-to-json)

jQuery plugin to serialize HTML tables into javascript objects.

## Features
- Automatically finds column headings
  - Override found column headings by using `data-override="overridden column name"`
  - Falls back on first row when no `th` elements are found
- Override cell values by using `data-override="new value"`
- Ignorable columns
- Not confused by nested tables

## Options
- `ignoreColNum`
  - Array of column indexes to ignore.
  - Default: `[]`
- `ignoreHiddenRows`
  - Boolean if hidden rows should be ignored or not.
  - Default: `true`

## Changes
- 0.5.0
  - Changed option `ignoreColNum` to `ignoreColumns`.
  - Merged `data-cell-value` and `data-column-name` into a single attribute: `data-override`.
- 0.4.0
  - No longer requires the use of `th` elements - always uses the first row as column names.
- 0.3.0
  - Added tests and fixed many bugs.

## Demo
- http://jsfiddle.net/62Kfp/9/

## Example

    <table id='example-table'>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th data-override="Score">Points</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td data-override="disqualified">50</td></tr>
        <tr>
          <td>Eve</td>
          <td>Jackson</td>
          <td>94</td></tr>
        <tr>
          <td>John</td>
          <td>Doe</td>
          <td>80</td></tr>
        <tr>
          <td>Adam</td>
          <td>Johnson</td>
          <td>67</td></tr>
      </tbody>
    </table>

    <script type="text/javascript">
      // Basic Usage
      var table = $('#example-table').tableToJSON();
      // table == [{"First Name"=>"Jill", "Last Name"=>"Smith", "Score"=>"disqualified"},
      //           {"First Name"=>"Eve", "Last Name"=>"Jackson", "Score"=>"94"},
      //           {"First Name"=>"John", "Last Name"=>"Doe", "Score"=>"80"},
      //           {"First Name"=>"Adam", "Last Name"=>"Johnson", "Score"=>"67"}]

      // Ignore first column (name)
      var table = $('#example-table').tableToJSON({
            ignoreColumns: [0]
      });
      // table == [{"Last Name"=>"Smith", "Score"=>"disqualified"},
      //           {"Last Name"=>"Jackson", "Score"=>"94"},
      //           {"Last Name"=>"Doe", "Score"=>"80"},
      //           {"Last Name"=>"Johnson", "Score"=>"67"}]
    </script>
