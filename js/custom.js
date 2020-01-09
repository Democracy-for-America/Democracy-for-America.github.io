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

// randomly order Bernie & Warren banner images
$(document).ready(function() {
  var rando = Math.random();
  if (rando < 0.5) {
    $("#sanders").detach().appendTo('#bannerRow');
  }  
});
