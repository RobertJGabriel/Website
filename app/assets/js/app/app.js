var bannerText, header, navText

window.robertjames = {}

header = $('.clearHeader')

navText = $('#logo1')

bannerText = $('#logo2')

robertjames.easterEgg = function () {
  cheet('↑ ↑ ↓ ↓ ← → ← → b a', function () {
    console.log('hi')
    $('#easteregg').modal('show')
  })
}

robertjames.events = function () {
  $('.menu-button').click(function (e) {
    $('.menu-bar').addClass('open')
    $('.grey').addClass('show')
    $('.overlay').show()
    e.stopPropagation()
  })
  $(document).click(function (e) {
    if (!$(e.target).is('.menu-bar *,.menu-bar')) {
      $('.menu-bar').removeClass('open')
      $('.grey').removeClass('show')
      $('.overlay').hide()
    }
  })
}

robertjames.init = function () {
  robertjames.events()
  robertjames.easterEgg()
  navText.addClass('show')
  navText.text('Robert James Gabriel')
}

robertjames.init()

;(function () {
  var WebP
  WebP = new Image()
  WebP.onload = WebP.onerror = function () {
    var s, sc
    if (WebP.height !== 2) {
      sc = document.createElement('script')
      sc.type = 'text/javascript'
      sc.async = true
      s = document.getElementsByTagName('script')[0]
      sc.src = 'assets/js/webpjs.min.js'
      s.parentNode.insertBefore(sc, s)
    }
  }
  WebP.src =
    'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
})()
