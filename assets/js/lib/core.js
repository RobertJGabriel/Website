$(function() {
    //caches a jQuery object containing the header element
    var header = $(".clearHeader");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

          if (scroll >= 100) {
              $("#logo1").removeClass("hide");
              $("#logo1").addClass("show");
              $("#logo1").text(" - " + $('#logo2').text());
              $("#logo2").removeClass("show");
              $("#logo2").addClass("hide");
          } else {

              $("#logo2").removeClass("hide");
              $("#logo2").addClass("show");
              $("#logo1").removeClass("show");
              $("#logo1").addClass("hide");

          

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
