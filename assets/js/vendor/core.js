$(function() {
    //caches a jQuery object containing the header element
    var header = $(".clearHeader");
    var navText = $("#logo1");
    var bannerText = $('#logo2');
    $(window).scroll(function() {

        var scroll = $(window).scrollTop();

          if (scroll >= 100) {
              navText.removeClass("hide");
              navText.addClass("show");
              bannerText.length? navText.text(" - " + bannerText.text()) : null;
              bannerText.removeClass("show");
              bannerText.addClass("hide");
          } else {
              bannerText.removeClass("hide");
              bannerText.addClass("show");
              navText.removeClass("show");
              navText.addClass("hide");
        }

    });




    $(".menu-button").click(function(e) {
        $(".menu-bar").addClass("open");
        $(".grey").addClass("show");
        e.stopPropagation();

    });



    $(document).click(function(e) {
        if (!$(e.target).is('.menu-bar *,.menu-bar')) {
            $(".menu-bar").removeClass("open");
                $(".grey").removeClass("show");
        }
    });
});
