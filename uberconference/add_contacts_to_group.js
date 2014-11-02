/* multi-line string http://stackoverflow.com/a/6247332/408945 */
inserted_html = ''
+ '<div id="jase_pasted_contacts" style="z-index:2000000; position:fixed; top:10px; left:10px; border:2px solid black; background-color:white;">'
+ '  <input type="button" id="jase_omni_button" value="Start Using List" />'
+ '  <input type="button" id="jase_close" value="X" style="float:right;"/>'
+ '  <div id="jase_status_bar">...waiting for numbers</div>'
+ '  <div>Paste phone numbers below</div>'
+ '  <textarea id="jase_pasted_contacts_textarea" style="height:600px; width:200px;"></textarea>'
+ '</div>';

$( 'div#jase_pasted_contacts').remove(); /* remove if already was present */
$( inserted_html ).insertBefore( 'div#app' ); /* insert the HTML into DOM */

$( 'input#jase_close' ).click(function(){
  $('div#jase_pasted_contacts').remove();
});

var array_of_lines = null;
var current_line = 0;
var total_lines = 0;

$( 'input#jase_omni_button' ).click(function(){
  
  /* the uberconference new contact input doesn't have an ID by default */
  if (!($('#uberconference-new-contact-input').length > 0)) {
    var $uberconference_new_input = $('li.tagit-new input:text');
    if ($uberconference_new_input.length > 0) {
      $uberconference_new_input.attr('id','uberconference-new-contact-input');
    } else {
      alert('Uh oh! The UberConference "Contact Group" window doesn\'t seem to be up.');
    }
  } /* end finding the input */

  /* load the lines from the box */
  if (array_of_lines == null) {
    /* any clicks are going to try to load the numbers */
    array_of_lines = $('#jase_pasted_contacts_textarea').val().split('\n');
    total_lines = array_of_lines.length;
    var msg = total_lines + ' numbers entered';
    if (total_lines > 0) {
      /* we have lines. get going */
      msg += '\n Let\'s Go!\nClick "Insert Next Contact" to start adding.';
      current_line = 1; /* 1-based counting here */
      $( 'input#jase_omni_button' ).val("Insert Next Contact");
      $( 'div#jase_status_bar' ).html('going, added ' + 0 + ' of ' + total_lines);
    } else {
      /* set it back to null to try again */
      array_of_lines = null;
      msg += '\n Oops. Paste in some numbers.';
    }
    alert(msg);
  } else {
    /* work with the pasted numbers, insert them */
    if (current_line <= total_lines) {
      var array_index = current_line - 1; /* 1-based line number to 0-based array index) */
      
      /* insert the current element into the add to group box */
      /* looks like the spreadsheets have numbers formatted all over the place */
      var the_number = array_of_lines[array_index];
      var the_number_normalized = the_number.replace(/[^0-9]/g,'');
      if (the_number_normalized.length != 10) {
        alert('Oops! Number not 10 digits.\nInserting anyway, see if you can clean it up.\n' + the_number + ' (' + the_number_normalized + ')');
      }
      $('#uberconference-new-contact-input').val(the_number_normalized);
      /* put the cursor into the box, so the user can press <enter> to add */
      $('#uberconference-new-contact-input').focus();
      $( 'div#jase_status_bar' ).html('going, added ' + current_line + ' of ' + total_lines);
      current_line++;
    } else {
      alert('no more numbers. paste more in!');
      array_of_lines = null; /* reset for more entry */
      $( 'input#jase_omni_button' ).val('Start Using List');
      $( 'div#jase_status_bar' ).html('...waiting for numbers');
    } /* end if there are more numbers */
  } /* end if array_of_lines = null */

}); /* #jase_omni_button.click() */
