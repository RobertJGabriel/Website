(function() {
  $(function() {
    var i;
    var i;
    var i;
    var aTagsElements, bannerText, color, h1Elements, h3Elements, header, hrElements, i, navText;
    header = $('.clearHeader');
    navText = $('#logo1');
    bannerText = $('#logo2');
    navText.addClass('show');
    navText.text('Robert James Gabriel');
    console.log("ss");
    cheet('↑ ↑ ↓ ↓ ← → ← → b a', function() {
      console.log('hi');
      $('#easteregg').modal('show');
    });
    if (window.location.href.indexOf('/apps.html') > -1) {
      $.ajax({
        type: 'get',
        url: 'https://api.github.com' + '/users/robertjgabriel/repos',
        data: {
          type: 'all',
          dataType: 'json'
        },
        success: function(installations) {
          var fullName, i, installation;
          console.log(installations);
          i = 0;
          while (i < installations.length) {
            installation = installations[i];
            fullName = "<h3>" + installation.name + "</h3>";
            i++;
            $('#gallery').append('<li><div class="panel panel-primary"><div class="panel-body">  <div class="appcover"></div><h3>' + fullName + '</h3><p>' + installation.description + ' <br/>  <b>Made Mostly with: ' + installation.language + '</p></div><div class="panel-footer"><a href="' + installation.url + '" class="btn btn-flat btn-warning">View Now</a></div></div></div></li>');
            Holder.run({});
          }
        },
        error: function(error) {
          return console.log(error);
        }
      });
    }
    $(window).scroll(function() {
      var scroll;
      scroll = $(window).scrollTop();
      if (scroll >= 100) {
        $('.navbar').addClass('shadow');
        if (bannerText.length > 0) {
          navText.text('Robert James Gabriel - ' + bannerText.text());
        } else {
          navText.text('Robert James Gabriel');
        }
      } else {
        $('.navbar').removeClass('shadow');
        if (bannerText.length > 0) {
          navText.text('Robert James Gabriel');
        } else {
          navText.text('Robert James Gabriel');
        }
      }
    });
    if (bannerText.length > 0) {
      h1Elements = document.getElementsByTagName('h1');
      hrElements = document.getElementsByTagName('hr');
      h3Elements = document.getElementsByTagName('h3');
      aTagsElements = document.getElementsByTagName('a');
      color = document.getElementById('header').style.backgroundColor;
      i = 1;
      while (i < h1Elements.length) {
        h1Elements[i].style.color = color;
        i++;
      }
      i = 0;
      while (i < h3Elements.length) {
        h3Elements[i].style.color = color;
        i++;
      }
      if (hrElements.length > 0) {
        i = 0;
        while (i < hrElements.length) {
          hrElements[i].style.color = color;
          i++;
        }
      }
      i = 6;
      while (i < aTagsElements.length) {
        console.log('s');
        aTagsElements[i].style.color = color;
        i++;
      }
    }
    $('.menu-button').click(function(e) {
      $('.menu-bar').addClass('open');
      $('.grey').addClass('show');
      $('.overlay').show();
      e.stopPropagation();
    });
    $(document).click(function(e) {
      if (!$(e.target).is('.menu-bar *,.menu-bar')) {
        $('.menu-bar').removeClass('open');
        $('.grey').removeClass('show');
        $('.overlay').hide();
      }
    });
  });

}).call(this);
