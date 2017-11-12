$(function() {
  coded = $('meta[name=contact]').attr("data-encoded");
  key = $('meta[name=contact]').attr("data-key");
  shift=coded.length
  link=""
  for (i=0; i<coded.length; i++) {
    if (key.indexOf(coded.charAt(i))==-1) {
      ltr = coded.charAt(i)
      link += (ltr)
    }
    else {
      ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
      link += (key.charAt(ltr))
    }
  }
  $('#mailto').attr("href", "mailto:"+link)
});
