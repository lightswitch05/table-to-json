# Table To JSON

jQuery plugin to serializes HTML tables into JSON objects.

## Features
- Automatically finds column headings
  - Override found column headings by using `data-column-name="overridden column name"`
- Override cell values by using `data-cell-value="new value"`
- Ignorable columns

## Options
- `ignoreColNum`
  - Array of column indexes to ignore.
  - Default: `[]`
- `ignoreHiddenRows`
  - Boolean if hidden rows should be included.
  - Default: `true`
  
## Example

    <table id='example-table'>
      <thead>
        <th>
          <th>First Name</th>
          <th>Last Name</th>
          <th data-column-name="Score">Points</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td data-cell-value="disqualified">50</td></tr>
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
            ignoreColNum: [0]
      });
      // table == [{"Last Name"=>"Smith", "Score"=>"disqualified"}, 
      //           {"Last Name"=>"Jackson", "Score"=>"94"},
      //           {"Last Name"=>"Doe", "Score"=>"80"},
      //           {"Last Name"=>"Johnson", "Score"=>"67"}]
    </script>
