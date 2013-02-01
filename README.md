# Table To JSON

Serializes HTML tables into JSON objects.

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
          <th>Points</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>Jill</td>
          <td>Smith</td>
          <td>50</td></tr>
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
      // table == [{"First Name"=>"Jill", "Last Name"=>"Smith", "Points"=>"50"}, 
      //           {"First Name"=>"Eve", "Last Name"=>"Jackson", "Points"=>"94"},
      //           {"First Name"=>"John", "Last Name"=>"Doe", "Points"=>"80"},
      //           {"First Name"=>"Adam", "Last Name"=>"Johnson", "Points"=>"67"}]
      
      // Ignore first column (name)
      var table = $('#example-table').tableToJSON({
            ignoreColNum: [0]
      });
      // table == [{"Last Name"=>"Smith", "Points"=>"50"}, 
      //           {"Last Name"=>"Jackson", "Points"=>"94"},
      //           {"Last Name"=>"Doe", "Points"=>"80"},
      //           {"Last Name"=>"Johnson", "Points"=>"67"}]
    </script>
