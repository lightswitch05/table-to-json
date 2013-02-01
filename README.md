# Table To JSON

Serializes HTML tables into JSON objects.

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
      var table = $('#example-table').tableToJSON();
      // table == [{"First Name"=>"Jill", "Last Name"=>"Smith", "Points"=>"50"}, 
      //           {"First Name"=>"Eve", "Last Name"=>"Jackson", "Points"=>"94"},
      //           {"First Name"=>"John", "Last Name"=>"Doe", "Points"=>"80"},
      //           {"First Name"=>"Adam", "Last Name"=>"Johnson", "Points"=>"67"}]
    </script>
