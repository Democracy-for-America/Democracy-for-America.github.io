function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function openPopup(el) {
  var width = window.innerWidth;
  var left = (width - 574)/2;
  return !window.open(el.href, '_blank', 'height=436, width=574, top=100, left=' + left);
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function(search, rawPos) {
      var pos = rawPos > 0 ? rawPos|0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}

// place signup form before text on mobile
$(document).ready(function() {

  if (window.matchMedia('(max-width: 549px)').matches) {
    $("#strategyText").detach().appendTo("#strategyPledge");
  }
  
  $( window ).resize(function() {
    if (window.matchMedia('(max-width: 549px)').matches) {
      $("#strategyText").detach().appendTo("#strategyPledge");
    } else {
      $("#strategyText").detach().prependTo("#strategyPledge");      
    }    
  });
  
  function shuffleFacts() {
    $('#factContainer div:first-child').hide().detach().appendTo("#factContainer").fadeIn(1000);
  };
  
  setInterval(shuffleFacts, 8000);

  
});

// Display ActionKit form validation errors
function onWidgetError(f, response) {
  $(".akFormField").removeClass("error");
  $(".errorMsg").text("");

  for ( error in response.errors ) {
    var wrapper = $("input[name=" + error + "]").parent();
    console.log(wrapper)
    wrapper.find(".errorMsg").text(response.errors[error][0]);
    wrapper.addClass("error");
  }
  return false;
}