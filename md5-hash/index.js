document.getElementById('fileinput').addEventListener('change', function(e) {

  document.getElementById("progress").innerHTML = 'loading...';

  // Initialize an HTML5 web worker and a FileReader
  var worker = new Worker('worker.js');
  var reader = new FileReader();
  var filename = this.files[0].name;

  // Get various config options
  var case_select = document.getElementById('case');
  var letter_case = case_select.options[case_select.selectedIndex].value;
  var quoted_fields_select = document.getElementById('quoted_fields');
  var quoted_fields = quoted_fields_select.options[quoted_fields_select.selectedIndex].value;
  var column_to_hash = document.getElementById('column_to_hash').value.trim();

  reader.onload = function() {
    worker.postMessage({
      'csv': reader.result,
      'filename': filename,
      'letter_case': letter_case,
      'column_to_hash': column_to_hash,
      'quoted_fields': quoted_fields
    });

    worker.addEventListener('message', function(e) {
      switch(e.data.cmd) {
        case 'complete':
          // Once the file finished processing, automatically download it
          
          if ( document.getElementById("errors").innerHTML === "" ) {
            document.getElementById("errors").innerHTML = "no errors detected";
          }

          var pom = document.createElement('a');
          pom.setAttribute('href', window.URL.createObjectURL(new Blob([e.data.msg], {type: 'text/csv'})));
          pom.setAttribute('download', '[hashed] ' + filename.replace('.tsv', '.csv'));

          document.body.appendChild(pom);
          document.getElementById("progress").innerHTML += '\n' + 'file ready!';
          pom.click();
          document.body.removeChild(pom);
          break;
        case 'progress':
          // Display the progress
          document.getElementById("progress").innerHTML = e.data.msg;
          break;
        case 'error':
          // Log any errors
          document.getElementById("errors").innerHTML += e.data.msg + '\n';
          break;
      }
    }, false);
  }

  reader.readAsText(this.files[0]);
}, false);