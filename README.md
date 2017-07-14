# Table To JSON

[![Build Status](https://travis-ci.org/lightswitch05/table-to-json.png?branch=master)](https://travis-ci.org/lightswitch05/table-to-json)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/lightswitch05/table-to-json?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

jQuery plugin to serialize HTML tables into javascript objects.

## Links
- Demo: http://lightswitch05.github.io/table-to-json/
- Plunker Template: http://plnkr.co/edit/iQFtcEEZkvsMJ2UqcrlW?p=preview

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
- `ignoreEmptyRows`
  - Boolean if empty rows should be ignored or not.
  - Default: `false`
- `headings`
  - Array of table headings to use. When supplied, treats entire table as values including the first `<tr>`
  - Default: `null`
- `allowHTML`
  - Boolean if HTML tags in table cells should be preserved
  - Default: `false`
- `includeRowId`
  - Either a `boolean` or a `string`. If `true`, the the `id` attribute on the table's `<tr>` elements will be included in the JSON as `rowId`. To override the name `rowId`, supply a string of the name you would like to use.
  - Default: `false`
- `textDataOverride`
  - String containing data-attribute which contains data which overrides the text contained within the table cell
  - Default: 'data-override'
- `textExtractor`
  - alias of `extractor`
- `extractor`
  - Function : function that is used on all *tbody* cells to extract text from the cells; a value in `data-override` will prevent this function from being called. Example:

    ```js
    $('table').tableToJSON({
      extractor : function(cellIndex, $cell) {
        // get text from the span inside table cells;
        // if empty or non-existant, get the cell text
        return $cell.find('span').text() || $cell.text();
      }
    });
    ```

    ```js
    $('table').tableToJSON({
      extractor : function(cellIndex, $cell) {
        return {
          name: $cell.find('span').text(),
          avatar: $cell.find('img').attr('src')
        };
      }
    });
    ```

  - Object : object containing a zero-based cell index (this *does not* take `colspan` cells into account!) of the table; a value in `data-override` will prevent this function from being called. Example:

    ```js
    $('table').tableToJSON({
      extractor : {
        0 : function(cellIndex, $cell) {
          return $cell.find('em').text();
        },
        1 : function(cellIndex, $cell) {
          return $cell.find('span').text();
        }
      }
    });
    ```

  - Default: `null`

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

## Contributing

* Install [Node.js](http://nodejs.org/).
  * this will also the `npm` package manager.
* run `npm install` from app root directory.
  * This installs grunt and other dependencies See `package.json` for a full list.
* run `npm install -g grunt-cli`.
* run `grunt` to run tests and create a new build in `/lib`.
* Make the changes you want.
* Make tests for the changes.
* Submit a pull request, please submit to the `develop` branch.

### Looking for a server-side solution?

[Colin Tremblay](https://github.com/tremblay) is working on a PHP implementation at [HTML-Table-To-JSON](https://github.com/tremblay/HTML-Table-to-JSON)

### Special Thanks
* [imamathwiz](https://github.com/imamathwiz) for adding `allowHTML` option and various other changes.
* [nenads](https://github.com/nenads) for adding `headings` option.
* [Mottie](https://github.com/Mottie) for adding `rowspan` & `colspan` support. Also adding the `textExtractor` & `dataOverride` feature!
* [station384](https://github.com/station384) for adding `includeRowId` support.
* [dayAlone](https://github.com/dayAlone) for adding `ignoreEmptyRows` option.
* [danielapsmaior](https://github.com/danielapsmaior) for discovering and fixing a `rowspan` & `colspan` bug.
* [koshuang](https://github.com/koshuang) for adding `extractor` feature!
* [noma4i](https://github.com/noma4i) added feature "Skip columns where headers are not present"

