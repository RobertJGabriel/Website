$(function() {
    //caches a jQuery object containing the header element
    var header = $(".clearHeader");
    var navText = $("#logo1");
    var bannerText = $('#logo2');
    navText.addClass("show");
    navText.text("Robert James Gabriel" );
    $(window).scroll(function() {

        var scroll = $(window).scrollTop();

          if (scroll >= 100) {


              bannerText.length > 0 ?  navText.text("Robert James Gabriel - " + bannerText.text()):navText.text("Robert James Gabriel" );
          } else {


                bannerText.length > 0 ? navText.text("Robert James Gabriel"):navText.text("Robert James Gabriel" );
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
