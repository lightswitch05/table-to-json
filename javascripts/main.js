$('#convert-table').click( function() {
  var table = $('#example-table').tableToJSON();
  console.log(table);
  alert(JSON.stringify(table));  
});