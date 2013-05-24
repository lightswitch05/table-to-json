$('#convert-table').click( function() {
  var table = $('#example-table').tableToJSON();
  alert(JSON.stringify(table));  
});