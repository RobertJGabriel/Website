$(function() {
    //caches a jQuery object containing the header element
    var header = $(".clearHeader");
    var navText = $("#logo1");
    var bannerText = $('#logo2');
    navText.addClass("show");
    navText.text("Robert James Gabriel");
    $(window).scroll(function() {

        var scroll = $(window).scrollTop();

        if (scroll >= 100) {
            bannerText.length > 0 ? navText.text("Robert James Gabriel - " + bannerText.text()) : navText.text("Robert James Gabriel");
        } else {
            bannerText.length > 0 ? navText.text("Robert James Gabriel") : navText.text("Robert James Gabriel");
        }

    });


    if (bannerText.length > 0) {


        var h1Elements = document.getElementsByTagName("h1");
        var hrElements = document.getElementsByTagName("hr");
        var h3Elements = document.getElementsByTagName("h3");
        var aTagsElements = document.getElementsByTagName("a");
        var color = document.getElementById('header').style.backgroundColor;
        for (var i = 1; i < h1Elements.length; i++) {
            h1Elements[i].style.color = color;
        }
        for (var i = 0; i < h3Elements.length; i++) {
            h3Elements[i].style.color = color;
        }
        if(hrElements.length > 0){
        for (var i = 0; i < hrElements.length; i++) {
            hrElements[i].style.color = color;
        }
      }
        for (var i = 4; i < aTagsElements.length; i++) {
            aTagsElements[i].style.color = color;
        }
    }
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
