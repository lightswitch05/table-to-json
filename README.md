# Table To JSON

[![Build Status](https://travis-ci.org/lightswitch05/table-to-json.png?branch=master)](https://travis-ci.org/lightswitch05/table-to-json)

jQuery plugin to serialize HTML tables into javascript objects.

## Demo
- http://lightswitch05.github.io/table-to-json/

## Features
- Automatically finds column headings
  - Override found column headings by using `data-override="overridden column name"`
  - Always uses first row as column headings regardless of `th` and `td` tags
- Override cell values column names by using `data-override="new value"`
- Ignorable columns
- Not confused by nested tables

## Options
- `ignoreColumns`
  - Array of column indexes to ignore.
  - Default: `[]`
- `onlyColumns`
  - Array of column indexes to include, all other columns are ignored. This takes presidence over `ignoreColumns` when provided.
  - Default: `null` - all columns
- `ignoreHiddenRows`
  - Boolean if hidden rows should be ignored or not.
  - Default: `true`
- `headings`
  - Array of table headings to use. When supplied, treats entire table as values including the first `<tr>`
  - Default: `null`
- `allowHTML`
  - Boolean if HTML tags in table cells should be preserved
  - Default: `false`

## Changes
- 0.7.0
  - Added `allowHTML` option to preserve HTML tags from table cells
- 0.6.0
  - Added `headings` option to define the headings of a table. When supplied, treats entire table as values.
- 0.5.1
  - Halved execution time.
  - Added more JSHint requirements.
- 0.5.0
  - **The release breaks backwards compatibility for both option names and data-* attributes.**
  - Changed option `ignoreColNum` to `ignoreColumns`.
  - Merged `data-cell-value` and `data-column-name` into a single attribute: `data-override`.
  - Added a new option `onlyColumns` to set which columns are included and ignores all others.
- 0.4.0
  - No longer requires the use of `th` elements - always uses the first row as column names.
- 0.3.0
  - Added tests and fixed many bugs.

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
