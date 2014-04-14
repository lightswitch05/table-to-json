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
- Works with `rowspan` and `colspan`

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

## Example

```html
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
```

### Looking for a server-side solution?

[Colin Tremblay](https://github.com/tremblay) is working on a PHP implementation at [HTML-Table-To-JSON](https://github.com/tremblay/HTML-Table-to-JSON)

### Special Thanks
* [imamathwiz](https://github.com/imamathwiz) for adding `allowHTML` option and various other changes.
* [nenads](https://github.com/nenads) for adding `headings` option.
* [Mottie](https://github.com/Mottie) for adding `rowspan` & `colspan` support.