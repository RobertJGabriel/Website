ljs.load(['http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js', 'dist/js/lib/jquery.min.js'], 'dist/js/lib/core.min.js',
  'dist/js/lib/bootstrap.min.js', 'dist/js/lib/ripples.min.js', 'dist/js/lib/material.min.js', 'dist/js/lib/cookie.min.js',
  function() {

    $.material.init();

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-39444052-10', 'auto');
    ga('send', 'pageview');

    if (regexUrlextensioncheck("github")){
      $(document).ready( function(){

      });
    }

  });


function regexUrlextensioncheck(n) {

  var s = document.URL,
    e = new RegExp(n);


  return e.test(s);
}
